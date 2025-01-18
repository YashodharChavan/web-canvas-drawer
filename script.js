let color = document.querySelector('input[name="color"]:checked').value;
        let intensity = document.getElementById('intensity').value;

        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');    
        ctx.lineJoin = ctx.lineCap = 'round';
        let isDragging = false;
        let lastX;
        let lastY;

        button = document.getElementById('reset');

        button.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        })

        function handleIntensityChange() {
            intensity = document.getElementById('intensity').value;
            console.log(intensity)
        }

        document.querySelectorAll('input[name="color"]').forEach(input => {
            input.addEventListener('change', () => {
                color = document.querySelector('input[name="color"]:checked').value;
                console.log(color)
            });
        });

        function getMousePosition(e) {
            let bound  = canvas.getBoundingClientRect();
            return {
                x: e.clientX - bound.left,
                y: e.clientY - bound.top
            }
        }

        canvas.addEventListener('mousedown', (e) => {
            document.body.style.cursor = 'crosshair';
            ctx.strokeStyle = color;
            ctx.lineWidth = intensity;
            isDragging = true;
            let {x, y} = getMousePosition(e);
            lastX = x;
            lastY = y;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                let {x, y} = getMousePosition(e);
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
                lastX = x;
                lastY = y;
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        })

        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        })