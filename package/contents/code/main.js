function range() {
    const a = readConfig("rangeStart", 25) / 100;
    const b = readConfig("rangeEnd", 50) / 100;
    return a <= b ? [a, b] : [b, a];
}

function center(w) {
    const screen = w.output.geometry;
    const geo = w.frameGeometry;
    const mid = geo.x + geo.width / 2;
    const [start, end] = range();
    if (mid < screen.x + screen.width * start || mid > screen.x + screen.width * end) {
        return;
    }
    const x = Math.round(screen.x + (screen.width - geo.width) / 2);
    if (Math.abs(geo.x - x) < 1) {
        return;
    }
    w.frameGeometry = { x: x, y: geo.y, width: geo.width, height: geo.height };
}

function watch(w) {
    if (!w.appletPopup) {
        return;
    }
    center(w);
    // Re-center after Plasma repositions the popup
    w.frameGeometryChanged.connect(function () { center(w); });
}

workspace.windowList().forEach(watch);
workspace.windowAdded.connect(watch);
