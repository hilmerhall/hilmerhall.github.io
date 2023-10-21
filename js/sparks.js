function startSparks(event){
    const canvas = document.getElementById("tesla-coil");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const arcs = [];

    function createArc(x, y) {
        arcs.push({
            x,
            y,
            age: 0,
            maxLength: Math.random() * 60 + 10,
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, 255)`,
        });
    }

    function drawArc(arc) {
        ctx.beginPath();
        ctx.moveTo(arc.x, arc.y);
        ctx.lineTo(arc.x + Math.random() * 200 - 100, arc.y + Math.random() * 200 - 100);
        ctx.strokeStyle = arc.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = arcs.length - 1; i >= 0; i--) {
            const arc = arcs[i];
            drawArc(arc);
            arc.age++;

            if (arc.age > arc.maxLength) {
                arcs.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    canvas.addEventListener("mousedown", (event) => {
        createArc(event.clientX, event.clientY);
    });

    animate();
}