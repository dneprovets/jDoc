export default function (options) {
    this._htmlOptions = copy({}, options, {
        unit: {
            font: "px",
            border: "px",
            margin: "px",
            padding: "px",
            base: "px"
        }
    });
}