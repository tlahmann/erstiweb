const positions = {
    calendar: { left: -100, top: 0 },
    news: { left: 100, top: 0 },
    team: { left: 0, top: 100 },
};

$(document).ready(() => {
    resetAll();
});

$(window).resize(() => {
    resetAll();
});

$(document).keypress((key) => {
    switch (key.keyCode) {
        case 49: resetAll(); $("#calendar").css('transform', 'translate(0,0)'); break;
        case 50: resetAll(); $("#news").css('transform', 'translate(0,0)'); break;
        case 51: resetAll(); $("#team").css('transform', 'translate(0,0)'); break;
        default: break;
    }
});

const resetAll = () => ["calendar", "news", "team"].forEach(name => $(`#${name}`).css('transform', `translate(${positions[name].left}vw,${positions[name].top}vh)`))
