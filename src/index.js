const positions = {
    controls: { left: 0, top: 0 },
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
        // press space
        case 32: resetAll(); break;
        // press [c] (lower- or upper-case)
        case 67:
        case 99:
            showCard('calendar');
            break;
        // press [n] (lower- or upper-case)
        case 78:
        case 110:
            showCard('news');
            break;
        // press [t] (lower- or upper-case)
        case 84:
        case 116:
            showCard('team');
            break;
        default: break;
    }
});


const resetAll = () => {
    $(`#controls`).css('transform', 'scale(1)');
    ['calendar', 'news', 'team']
        .forEach(name => {
            $(`#${name}`).css('display', 'none')
            $(`#${name}>div`).css('transform', 'scale(0)');
        });
}

const showCard = (cardName) => {
    resetAll();
    $(`#controls`).css('transform', 'scale(0)');
    $(`#${cardName}`).css('display', 'block');
    $(`#${cardName}>div`).css('transform', 'scale(1)');
}
