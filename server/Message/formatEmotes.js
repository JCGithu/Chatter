const { getChan } = require('../Twitch/twitchNames');
const { bttvEmoteCache } = require('../Twitch/getEmotes');

module.exports = function formatEmotes(channel, text, emotes) {
  let bttvEmotes = bttvEmoteCache.data.global.slice(0);
  let chan = getChan(channel);

  if (chan in bttvEmoteCache.data) bttvEmotes = bttvEmotes.concat(bttvEmoteCache.data[chan]);

  text.replace('<<', '').replace('{"', '');
  var splitText = text.split('');

  bttvEmotes.forEach(({ code, id }) => {
    if (text.indexOf(code) === -1) return;
    for (let s = text.indexOf(code); s > -1; s = text.indexOf(code, ++s)) {
      let end = s + code.length;
      let url = bttvEmoteCache.urlTemplate.replace('{{id}}', id).replace('{{image}}', '1x');
      let mote = [parseInt(s), parseInt(end)];
      let l = mote[1] - mote[0];
      let empty = Array.apply(null, new Array(l + 1)).map(function () {
        return '';
      });
      splitText = splitText
        .slice(0, mote[0])
        .concat(empty)
        .concat(splitText.slice(mote[1] + 1, splitText.length));
      splitText.splice(mote[0], 1, `<<{"img":true,"bttv":"https:${url}", "bttvId":"${code}"}<<`);
    }
  });
  for (var i in emotes) {
    var e = emotes[i];
    for (var j in e) {
      var mote = e[j];
      if (typeof mote != 'string') continue;
      mote = mote.split('-');
      mote = [parseInt(mote[0]), parseInt(mote[1])];
      var length = mote[1] - mote[0];
      let empty = Array.apply(null, new Array(length + 1)).map(function () {
        return '';
      });
      splitText = splitText
        .slice(0, mote[0])
        .concat(empty)
        .concat(splitText.slice(mote[1] + 1, splitText.length));
      splitText.splice(mote[0], 1, `<<{"img":true,"twitch":${i}}<<`);
    }
  }
  let finalArray = splitText
    .join('')
    .split('<<')
    .map((x) => {
      if (x.startsWith('{"')) {
        return JSON.parse(x);
      }
      return { str: x };
    });
  return finalArray;
};
