'use strict';
// O deslocamento explícito garante 22h em Brasília, em qualquer fuso do visitante.
const eventTime = new Date('2026-11-25T22:00:00-03:00').getTime();
const eventEndTime = new Date('2026-11-25T22:50:00-03:00').getTime();
const units = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
let countdownInterval;
function updateCountdown(now = Date.now()) {
  const remaining = Math.max(0, eventTime - now);
  const totalSeconds = Math.floor(remaining / 1000);
  const values = [Math.floor(totalSeconds / 86400), Math.floor(totalSeconds / 3600) % 24, Math.floor(totalSeconds / 60) % 60, totalSeconds % 60];
  units.forEach((element, index) => { element.textContent = String(values[index]).padStart(2, '0'); });
  if (remaining === 0) {
    document.querySelector('.countdown').hidden = true;
    document.getElementById('countdown-label').textContent = 'UM MOMENTO PARA CELEBRAR';
    const message = document.getElementById('event-message');
    message.hidden = false;
    message.textContent = now < eventEndTime ? 'Chegou o grande momento! ✧' : 'Uma conquista para guardar na memória. Obrigada por fazer parte dessa jornada!';
    if (now >= eventEndTime) clearInterval(countdownInterval);
  }
}
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
// Uma única abertura por visita; o botão nativo também permite Enter e Espaço.
let opened = false;
async function openInvitation() {
  if (opened) return;
  opened = true;
  const envelope = document.getElementById('envelope');
  const button = document.getElementById('open-button');
  envelope.disabled = true;
  button.disabled = true;
  const intro = document.querySelector('.intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  document.body.classList.add('opening');
  if (!reducedMotion) {
    await wait(2600);
    intro.classList.add('leaving');
    await wait(650);
  }
  intro.hidden = true;
  const invitation = document.getElementById('invitation');
  invitation.hidden = false;
  invitation.classList.add('reveal');
  window.scrollTo({top: 0, behavior: 'instant'});
  invitation.focus({preventScroll: true});
}
document.getElementById('envelope').addEventListener('click', openInvitation);
document.getElementById('open-button').addEventListener('click', openInvitation);
