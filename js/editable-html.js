(function() {
    'use strict';

    var mceEvents = require('./editor-libs/events.js');
    var codeBlock = document.getElementById('static-js');
    var update = document.getElementById('update');
    var liveContainer = '';
    var output = document.querySelector('#output');
    var reset = document.getElementById('reset');

    var codeMirror;
    var staticContainer;

    /**
     * Reads the content of the editor and uses it to update the output block
     */
    function applyCode() {
        var codeMirrorDoc = codeMirror.getDoc();
        updateOutput(codeMirrorDoc.getValue());
    }

    /**
     * Initialize CodeMirror
     */
    function initCodeMirror() {
        var editorContainer = document.getElementById('editor');
        // eslint-disable-next-line new-cap
        codeMirror = CodeMirror(editorContainer, {
            autofocus: true,
            inputStyle: 'contenteditable',
            lineNumbers: true,
            lineWrapping: true,
            mode: 'xml',
            htmlMode: true,
            undoDepth: 5,
            tabindex: 0,
            value: codeBlock.textContent
        });
    }

    /**
     * Initialize the interactive editor
     */
    function initInteractiveEditor() {
        staticContainer = document.getElementById('static');
        staticContainer.classList.add('hidden');

        liveContainer = document.getElementById('live');
        liveContainer.classList.remove('hidden');

        mceEvents.register();

        initCodeMirror();
    }

    /**
     * Executes the provided code snippet and logs the result
     * to the output container.
     * @param {String} exampleCode - The code to execute
     */
    function updateOutput(exampleCode) {
        output.classList.add('fade-in');

        try {
            // Create a new Function from the code, and immediately execute it.
            output.innerHTML = exampleCode;
        } catch (event) {
            output.textContent = 'Error: ' + event.message;
        }

        output.addEventListener('animationend', function() {
            output.classList.remove('fade-in');
        });
    }


    initInteractiveEditor();

    update.addEventListener('click', function() {
        output.textContent = '';
        applyCode();
    });

    reset.addEventListener('click', function() {
        window.location.reload();
    });
    
    applyCode();

})();
