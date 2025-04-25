let player = { health: 100, attackPower: 20, money: 0 };
let enemy = { health: 50, attackPower: 10 };
let fightCount = 0;

const statusEl = document.getElementById('status');
const statsEl = document.getElementById('stats');
const moneyEl = document.getElementById('money');
const attackBtn = document.getElementById('attack');
const healBtn = document.getElementById('heal');
const upgradeBtn = document.getElementById('upgrade');
const nextBtn = document.getElementById('next');
const enemySprite = document.getElementById('enemy-sprite');

function updateStatus() {
    statsEl.textContent = `Player Health: ${player.health} | Enemy Health: ${enemy.health}`;
    moneyEl.textContent = `Gold Nuggets: ${player.money}`;
}

function attack() {
    enemy.health -= player.attackPower;
    if (enemy.health <= 0) {
        player.money += 15;
        statusEl.textContent = 'Victory! Click "Next Fight" to continue.';
        attackBtn.disabled = true;
        healBtn.disabled = true;
        upgradeBtn.disabled = true;
        nextBtn.disabled = false;
    } else {
        player.health -= enemy.attackPower;
        if (player.health <= 0) {
            statusEl.textContent = 'Game Over!';
            attackBtn.disabled = true;
            healBtn.disabled = true;
            upgradeBtn.disabled = true;
            nextBtn.disabled = true;
        }
    }
    updateStatus();
}

function heal() {
    if (player.money >= 5) {
        player.money -= 5;
        player.health += 20;
        statusEl.textContent = 'You healed for 20 health!';
        if (enemy.health > 0) {
            player.health -= enemy.attackPower;
        }
        if (player.health <= 0) {
            statusEl.textContent = 'Game Over!';
            attackBtn.disabled = true;
            healBtn.disabled = true;
            upgradeBtn.disabled = true;
            nextBtn.disabled = true;
        }
    } else {
        statusEl.textContent = 'Not enough gold nuggets to heal!';
    }
    updateStatus();
}

function upgrade() {
    if (player.money >= 15) {
        player.money -= 15;
        player.attackPower += 5;
        statusEl.textContent = 'Damage upgraded!';
    } else {
        statusEl.textContent = 'Not enough gold nuggets!';
    }
    updateStatus();
}

function nextFight() {
    fightCount++;
    if (fightCount > 20) {
        statusEl.textContent = 'Congratulations! You found the ruby trail!';
        attackBtn.disabled = true;
        healBtn.disabled = true;
        upgradeBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }
    enemy.health = 50;
    statusEl.textContent = `A new enemy appears! Fight ${fightCount}/20`;
    attackBtn.disabled = false;
    healBtn.disabled = false;
    upgradeBtn.disabled = false;
    nextBtn.disabled = true;
    updateStatus();
}

attackBtn.addEventListener('click', attack);
healBtn.addEventListener('click', heal);
upgradeBtn.addEventListener('click', upgrade);
nextBtn.addEventListener('click', nextFight);

updateStatus();
