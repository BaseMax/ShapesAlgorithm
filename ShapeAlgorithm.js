// Max Base
// https://github.com/BaseMax/ShapesAlgorithm
// 2022/09/18

// 9 items 3cm in 3cm (called G1)
// 3 items 1cm in 3cm (called G2)
// 3 items 3cm in 1cm (called G3)
// And a 1cm in 1cm item (called G4)

class ShapeAlgorithm {
    constructor() {
        this.main_box = {
            w: 14,
            h: 8
        };
        this.max_box = {
            w: 3,
            h: 3
        };
        this.mat = [];
        this.colors = [];
        this.sizes = [];

        this.init();
    }

    init() {
        this.initMat();
        this.initSizes();
    }

    initMat() {
        for (let i = 0; i < this.main_box.h; i++) {
            this.mat[i] = [];
            for (let j = 0; j < this.main_box.w; j++) {
                this.mat[i][j] = null;
            }
        }
    }

    initSizes() {
        for (let i = this.max_box.h; i >= 1; i--) {
            for (let j = this.max_box.w; j >= 1; j--) {
                if (i === this.max_box.h && j === this.max_box.w) continue;

                this.sizes.push([j, i]);
            }
        }
    }

    randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    cropMatrix(w, h, width, height) {
        const arr = [];
        for (let i = 0; i < height; i++) {
            arr.push([]);
            for (let j = 0; j < width; j++) {
                if (this.mat[h + i] === undefined || this.mat[h + i][w + j] === undefined) return null;

                arr[i].push(this.mat[h + i][w + j]);
            }
        }
        return arr;
    }

    hasUndefinedRectangle(width, height) {
        for (let h = 0; h < this.mat.length; h++) {
            for (let w = 0; w < this.mat[0].length; w++) {
                if (this.mat[h][w] !== null) continue;

                const arr = this.cropMatrix(w, h, width, height);
                if (arr === null) continue;

                if (arr.every((row) => row.every((value) => value === null))) {
                    return {
                        x: w,
                        y: h,
                        sx: width,
                        xy: height
                    };
                }
            }
        }

        return false;
    }

    calculate() {
        // colorize all possible this.max_box.w * this.max_box.h items iterate
        for (let i = 0; i < this.mat.length; i += this.max_box.h) {
            for (let j = 0; j < this.mat[i].length; j += this.max_box.w) {
                if (j >= this.main_box.w || i >= this.main_box.h || j+this.max_box.w >= this.main_box.w || i+this.max_box.h >= this.main_box.h) break;

                const color = this.randomColor();
                this.colors[`${this.max_box.w}_${this.max_box.h}`] = 1;

                for (let k = 0; k < this.max_box.h; k++) {
                    for (let l = 0; l < this.max_box.w; l++) {
                        this.mat[i + k][j + l] = {
                            "color": color,
                            "name": 1
                        };
                    }
                }
            }
        }

        // colorize all possible box smaller than this.max_box.w and this.max_box.h
        const lookingForSize = (size) => {
            // we are looking for rectangles with `size[0]` as width and `size[1]` as height in this.mat (matrix) they are UNDEFINED fields
            const res = this.hasUndefinedRectangle(size[0], size[1]);
            
            if (res !== false) {
                // we found a rectangle with `size[0]` as width and `size[1]` as height in this.mat (matrix) they are UNDEFINED fields
                // now we should fill them with a color
                const color = this.randomColor();
                if (!this.colors[`${size[0]}_${size[1]}`]) {
                    this.colors[`${size[0]}_${size[1]}`] = Object.keys(this.colors).length + 1;
                }
                const key = this.colors[`${size[0]}_${size[1]}`];

                for (let i = 0; i < size[1]; i++) {
                    for (let j = 0; j < size[0]; j++) {
                        this.mat[res["y"] + i][res["x"] + j] = {
                            "color": color,
                            "name": key
                        };
                    }
                }

                return true;
            }

            return false;
        };

        // colorize all possible boxs with `sizes` size
        for (let i = 0; i < this.sizes.length; i++) {
            const size = this.sizes[i];

            // looking for possible boxs with `size` size
            // if there are undefiend with `size`, so we can generate a random color and fill that.
            while(lookingForSize(size) === true) {}
        }
    }

    print() {
        let res = "";

        res += "<table border=\"2\">";
        for (let i = 0; i < this.mat.length; i++) {
            res += "\t<tr align=\"center\">";
            for (let j = 0; j < this.mat[0].length; j++) {
                if (this.mat[i][j] === null) {
                    res += "\t\t<td>N</td>";
                } else {
                    res += "\t\t<td style=\"background-color: " + this.mat[i][j].color + "\">" + this.mat[i][j].name + "</td>";
                }
            }
            res += "\t</tr>";
        }
        res += "</table>";

        return res;
    }

    getColors() {
        return this.colors;
    }

    getSizes() {
        return this.sizes;
    }

    getMat() {
        return this.mat;
    }

    getMainBox() {
        return this.main_box;
    }

    getMaxBox() {
        return this.max_box;
    }

    getMatSize() {
        return {
            w: this.mat[0].length,
            h: this.mat.length
        };
    }
}

const shape = new ShapeAlgorithm();
shape.calculate();
console.log(shape.print());
