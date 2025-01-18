const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// tạo dối tượng bóng
class Ball{
    constructor(x,y, angle, speed ,width,height) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.width = width;
        this.height = height;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#808080';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#5C5C5C'
        ctx.stroke();
        ctx.closePath();
    }
    move(){
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }
}
const ball = new Ball(canvas.width / 2, canvas.height /2, Math.PI/ 4, 2, canvas.width, canvas.height);

// tạo đối tượng thanh đỡ
// tạo nut trái phải
let btnLeft = false;
let btnRight = false;
document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') btnLeft = true;
    if(e.key === 'ArrowRight') btnRight = true;
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'ArrowLeft') btnLeft = false;
    if(e.key === 'ArrowRight') btnRight = false;
})
class Bar{
    constructor(x, y, width, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 8);
        ctx.fillStyle = '#0000FE';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#5C5C5C';
        ctx.stroke();
        ctx.closePath();
    }
    move(left, right, canvasWidth){
        if(left && this.x > 0){
            this.x -= this.speed;
        }
        if(right && this.x + this.width < canvasWidth){
            this.x += this.speed;
        }
    }
}
let score = 0;  //TAO DIEM
let gameOver = false; // KET THUC GAME
const bar = new Bar((canvas.width - 100) / 2, canvas.height - 84, 100, 5);
function update(){
    if (gameOver) return;

    ctx.clearRect(0, 0,canvas.width, canvas.height);
    // kiểm tra va chạm
    if (ball.y + 6 >= bar.y && ball.y - 6 <= bar.y + 8 && ball.x >= bar.x && ball.x <= bar.x + bar.width) {
        // Nếu bóng chạm vào thanh, đổi hướng bóng
        ball.angle = -ball.angle;
        score +=1;
        ball.speed += 0.2;
        document.getElementById('scoce').innerText = score;
    }
    //đoi huong khi cham tuong
    if (ball.x - 6 <= 0 || ball.x + 6 >= canvas.width) ball.angle = Math.PI - ball.angle;
    if (ball.y - 6 <= 0) ball.angle = -ball.angle;
    // game ket thuc
    if (ball.y + 6 > canvas.height) {
        gameOver = true; // Kết thúc trò chơi
        alert('Trò chơi kêt thúc! điểm của bạn là: ' + score); // Thông báo thua
        return; // Dừng vòng lặp
    }
    // -------------------------------------------
    ball.draw(ctx);
    ball.move();
    // goi bar
    bar.draw(ctx)
    bar.move(btnLeft, btnRight, canvas.width);
    requestAnimationFrame(update);
}
update();