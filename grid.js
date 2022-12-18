const proces = require(`process`)

const grid = []
const size = 23

for (let x = 0; x < size; x++) {
    grid[x] = []
    for (let y = 0; y < size; y++) {
        grid[x][y] = 0
    }
}

const red = {
    0:  [ 9, 16 ],
    1:  [ 22 ],
    3:  [ 0 ],
    4:  [ 17 ],
    5:  [ 0, 1, 2 ],
    6:  [ 0, 21 ],
    7:  [ 0, 7, 10, 22 ],
    8:  [ 14 ],
    9:  [ 18 ],
    10: [ 7, 22 ],
    12: [ 13 ],
    13: [ 11, 20 ],
    14: [ 10, 22 ],
    15: [ 11, 22 ],
    16: [ 1, 7 ],
    18: [ 7 ],
    19: [ 16, 17 ],
    21: [ 6, 16 ]
}

// put goals on the grid
const map_x = {}
const map_y = {}
for (const x in red) {
    map_x[x] = true
    for (const y of red[x]) {
        map_y[y] = true
        grid[x][y] = 1
    }
}

// output initial grid
console.log(`Initial Grid`)
for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        let s = grid[y][x] == 1 ? "#" : " "
        process.stdout.write(`[${s}]`)
    }
    console.log(``)
}

// scan the grid
scan = []
for (let x = 0; x < size; x++) {
    scan[x] = []
    for (let y = 0; y < size; y++) {
        scan[x][y] = 0
    }
}
for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        if (grid[x][y] == 1) {
            // scan horizontal
            for (let _x = 0; _x < size; _x++) {
                grid[_x][y] += 1
            }

            // scan vertical
            for (let _y = 0; _y < size; _y++) {
                grid[x][_y] += 1
            }

            let j = x
            let i = y;
            while (i < size && j < size && i > -1 && j > -1) {
                scan[i][j] += 1
                j--
                i--
            }

            j = x
            i = y;
            while (i < size && j < size && i > -1 && j > -1) {
                scan[i][j] += 1
                j--
                i++
            }

            j = x
            i = y;
            while (i < size && j < size && i > -1 && j > -1) {
                scan[i][j] += 1
                j++
                i--
            }

            j = x
            i = y;
            while (i < size && j < size && i > -1 && j > -1) {
                scan[i][j] += 1
                j++
                i++
            }

            scan[x][y] = 0 // cant place bomb at these spots
        }
    }
}

console.log(`search grid mapped`)
cutoff = 6
process.stdout.write(`    `)
for (let x = 0; x < size; x++) {
    process.stdout.write(`${x} `.padStart(3, ` `))
}
console.log(`\n   +` + `-`.repeat(23 * 3 - 1))
for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        if (y == 0) {
            process.stdout.write(`${x}`.padEnd(2, ` `) + ` |`)
        }
        let s = scan[y][x]
        if (s < cutoff) {
            s = 0
        }
        if (map_x[x] && map_y[y]) {
            // s = `#`
        }
        process.stdout.write(`${s} `.padStart(3, ` `))
    }
    console.log(``)
}
