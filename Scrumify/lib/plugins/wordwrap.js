ig.module('plugins.wordwrap').requires('impact.font').defines(function() {
    WordWrapper = ig.Class.extend({
        font: null,
        box: null,
        init: function(f, b) {
            this.font = f;
            this.box = b;
        },
        wrapMessage: function(message) {
            var words = message.split(" ");
            var wordWidths = this.getWordWidths(words);
            var width = this.box.w;
            var newLine = "\n";
            var space = " ";
            var spaceWidth = this.font.widthForString(" ");
            var widthCounter = 0;
            var newMessage = "";
            for (var i = 0; i < wordWidths.length; i++) {
                if (widthCounter + wordWidths[i] + spaceWidth <= width) {
                    widthCounter += wordWidths[i] + spaceWidth;
                    newMessage += words[i] + space;
                } else {
                    widthCounter = 0;
                    widthCounter += wordWidths[i] + spaceWidth;
                    newMessage += newLine + words[i] + space;
                }
            }
            return newMessage;
        },
        getWordWidths: function(wordsArr) {
            var arr = new Array();
            for (var i = 0; i < wordsArr.length; i++) {
                arr.push(this.font.widthForString(wordsArr[i]));
            }
            return arr;
        }
    });
});