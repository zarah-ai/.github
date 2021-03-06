const vn = require("voronoi");
const fs = require("fs");
const pt = require("path");
const cv = require("canvas");

const main = async (args) => {
    const canvas = cv.createCanvas(args.size, args.size);
    const ctx = canvas.getContext("2d");

    const density = Math.floor((0.05 + 0.10 * Math.random()) * args.size);
    const points = [...Array(density).keys()].map(() => { 
        return {
            x: Math.random() * args.size,
            y: Math.random() * args.size
        };
    });

    var voronoi = new vn();
    var planes = voronoi.compute(points, {xl: 0, xr: args.size, yt: 0, yb: args.size*0.5}).cells;

    const l = Math.round(Math.random() * 100);

    ctx.strokeStyle = "hsl(" + Math.round(Math.random() * 360) + "," + Math.round(Math.random() * 100) + "%," + (100 - l) + "%)";
    ctx.lineWidth = Math.floor(5 * Math.random());

    for (let n = 0; n < planes.length; n++) {
        let edges = planes[n].halfedges.map(x => x.edge);
        let current = undefined;
        ctx.fillStyle = "hsl(" + Math.round(Math.random() * 360) +  "," + Math.round(Math.random() * 100) + "%," + l + "%)";
        ctx.beginPath();
        while (edges.length > 0) {
            if (current == null) {
                ctx.moveTo(edges[0].va.x, edges[0].va.y);
                ctx.lineTo(edges[0].vb.x, edges[0].vb.y);
                current = edges[0].vb;
                edges.splice(0, 1);
            } else {
                const i = edges.findIndex(x => {
                    const x1 = Math.round(x.va.x) == Math.round(current.x);
                    const y1 = Math.round(x.va.y) == Math.round(current.y);
                    const x2 = Math.round(x.vb.x) == Math.round(current.x);
                    const y2 = Math.round(x.vb.y) == Math.round(current.y);
                    return (x1 && y1) || (x2 && y2);
                });

                if (i == -1) {
                    ctx.closePath();
                    break
                }
                
                if (Math.round(edges[i].va.x) == Math.round(current.x) && Math.round(edges[i].va.y) == Math.round(current.y)) {
                    ctx.lineTo(edges[i].vb.x, edges[i].vb.y);
                    current = edges[i].vb;
                } else if (Math.round(edges[i].vb.x) == Math.round(current.x) && Math.round(edges[i].vb.y) == Math.round(current.y)) {
                    ctx.lineTo(edges[i].va.x, edges[i].va.y);
                    current = edges[i].va;
                }
                edges.splice(i, 1);
            }
        }
        ctx.stroke()
        ctx.fill();
    }

    const pixels = cv.createCanvas(args.size, args.size*0.5);
    pixels.getContext("2d").drawImage(canvas, 0, 0);
    ctx.scale(1, -1);
    ctx.drawImage(pixels, 0, -args.size);

    if (args.path != null) {
        const dir = pt.parse(args.path).dir;
        const recursive = { recursive: true };
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, recursive);
        }
        const patternPath = pt.format({ ...pt.parse(args.path), base: "", ext: ".png" })
        fs.writeFileSync(patternPath, canvas.toBuffer());
        return "Successfully wrote to file: " + patternPath;
    } else {
        return ctx.createPattern(canvas, "repeat");
    }
};

module.exports = main;