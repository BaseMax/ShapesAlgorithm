/*
 * Name: Shapes Algorithm
 * Repository: https://github.com/BaseMax/ShapesAlgorithm
 * Author: Max Base
 * Date: 2022/09/18
 */

class ShapeAlgorithm {
    constructor(ww, wh, bw, bh) {
        this.window = {
            w: ww,
            h: wh
        };
        this.biggest_box = {
            w: bw,
            h: bh
        };
        this.matrix = [];
        this.labels = [];
        this.sizes = [];

        this.init();
    }

    init() {
        this.initMatrix();
        this.initSizes();
    }

    initMatrix() {
        for (let i = 0; i < this.window.h; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.window.w; j++) {
                this.matrix[i][j] = null;
            }
        }
    }

    initSizes() {
        for (let i = this.biggest_box.h; i >= 1; i--) {
            for (let j = this.biggest_box.w; j >= 1; j--) {
                if (i === this.biggest_box.h && j === this.biggest_box.w) continue;

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
                if (this.matrix[h + i] === undefined || this.matrix[h + i][w + j] === undefined) return null;

                arr[i].push(this.matrix[h + i][w + j]);
            }
        }
        return arr;
    }

    hasUndefinedRectangle(width, height) {
        for (let h = 0; h < this.matrix.length; h++) {
            for (let w = 0; w < this.matrix[0].length; w++) {
                if (this.matrix[h][w] !== null) continue;

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
        // colorize all possible this.biggest_box.w * this.biggest_box.h items iterate
        for (let i = 0; i < this.matrix.length; i += this.biggest_box.h) {
            for (let j = 0; j < this.matrix[0].length; j += this.biggest_box.w) {
                if (j > this.window.w || i > this.window.h || j + this.biggest_box.w > this.window.w || i + this.biggest_box.h > this.window.h) break;

                this.labels[`${this.biggest_box.w}_${this.biggest_box.h}`] = {
                    "name": 1,
                    "quantity": 0
                };

                const color = this.randomColor();

                for (let k = 0; k < this.biggest_box.h; k++) {
                    for (let l = 0; l < this.biggest_box.w; l++) {
                        this.labels[`${this.biggest_box.w}_${this.biggest_box.h}`].quantity++;

                        this.matrix[i + k][j + l] = {
                            "color": color,
                            "name": 1
                        };
                    }
                }
            }
        }

        // colorize all possible box smaller than this.biggest_box.w and this.biggest_box.h
        const lookingForSize = (size) => {
            // we are looking for rectangles with `size[0]` as width and `size[1]` as height in this.matrix (matrix) they are NULL fields
            const res = this.hasUndefinedRectangle(size[0], size[1]);
            
            if (res !== false) {
                // we found a rectangle with `size[0]` as width and `size[1]` as height in this.matrix (matrix) they are NULL fields
                // now we should fill them with a color
                if (!this.labels[`${size[0]}_${size[1]}`]) {
                    this.labels[`${size[0]}_${size[1]}`] = {
                        "name": Object.keys(this.labels).length + 1,
                        "quantity": 0
                    };
                }
                this.labels[`${size[0]}_${size[1]}`].quantity++;
                const key = this.labels[`${size[0]}_${size[1]}`];


                const color = this.randomColor();

                for (let i = 0; i < size[1]; i++) {
                    for (let j = 0; j < size[0]; j++) {
                        this.matrix[res["y"] + i][res["x"] + j] = {
                            "color": color,
                            "name": key.name
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
            while (lookingForSize(size) === true) {}
        }
    }

    print() {
        let res = "";

        res += "<table border=\"2\">";
        for (let i = 0; i < this.matrix.length; i++) {
            res += "\t<tr align=\"center\">";
            for (let j = 0; j < this.matrix[0].length; j++) {
                if (this.matrix[i][j] === null) {
                    res += "\t\t<td>N</td>";
                } else {
                    res += "\t\t<td style=\"background-color: " + this.matrix[i][j].color + "\">" + this.matrix[i][j].name + "</td>";
                }
            }
            res += "\t</tr>";
        }
        res += "</table>";

        return res;
    }

    draw(elm) {
        if (!elm) {
            console.error("No element to draw");
        }
        elm.innerHTML = this.print();
    }

    getLabels() {
        return this.labels;
    }

    getSizes() {
        return this.sizes;
    }

    getMatrix() {
        return this.matrix;
    }

    getWindow() {
        return this.window;
    }

    getBiggestBox() {
        return this.biggest_box;
    }

    getMatrixSize() {
        return {
            w: this.matrix[0].length,
            h: this.matrix.length
        };
    }

    getQuantities() {
        const res = [];

        for (const key in this.labels) {
            const keys = key.split("_");
            const label = this.labels[key];

            res.push({
                "label": label.name,
                "quantity": label.quantity,
                "width": parseInt(keys[0]),
                "height": parseInt(keys[1])
            });
        }

        return res;
    }
}

// =================== Example
// const shape = new ShapeAlgorithm(10, 10, 3, 3);
// shape.calculate();
// console.log(shape.print());
// console.log(shape.getQuantities());
