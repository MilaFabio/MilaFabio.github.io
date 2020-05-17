document.addEventListener('DOMContentLoaded', function() {
    let questions = [];
    let result = [];
    let idx;

    // All HTML elements from index.html file for manipulation
    let elems = {
        button: {
            openModal: '#btnOpenModal',
            menu: '#burger'
        },
        modal: {
            id: '#modalBlock',
            form: {
                id: '#formAnswers',
                question: '#question',
                answers: '#formAnswers',
            },
            button: {
                close: '#closeModal',
                previous: '#prev',
                next: '#next',
                send: '#send'
            }
        }
    };
    elems = applySelector(elems); // transform string CSS selectors to HTML elements

    // All handlers, which will be used in program
    const handle = {
        window: {
            width: () => {
                let clientWidth = document.documentElement.clientWidth;
                elems.button.menu.style.display = clientWidth > 768 ? 'none' : 'flex';
            }
        },
        dialog: {
            show: () => {
                idx = -1;
                render(0);
                elems.button.menu.classList.add('active');
                elems.modal.id.classList.add('d-block');
            },
            hide: () => {
                saveResult();
                elems.button.menu.classList.remove('active');
                elems.modal.id.classList.remove('d-block');
            },
            previous: () => {
                saveResult();
                let id = Math.max(idx - 1, 0);
                render(id);
            },
            next: () => {
                saveResult();
                let id = Math.min(idx + 1, questions.length);
                render(id);
            },
            send: () => {
                saveResult();
                renderResult();
                setTimeout(() => {
                    elems.button.menu.classList.remove('active');
                    elems.modal.id.classList.remove('d-block');
                    result = [];
                }, 5000);
            },
            outside: (event) => {
                if (event.target === elems.modal.id) {
                    saveResult();
                    handle.dialog.hide();
                }
            }
        }
    }

    // Main procedure
    function init() {
        // Attach handlers to DOM elements
        window.addEventListener('resize', handle.window.width);
        elems.button.menu.addEventListener('click', handle.dialog.show);
        elems.button.openModal.addEventListener('click', handle.dialog.show);
        elems.modal.button.close.addEventListener('click', handle.dialog.hide);
        elems.modal.button.previous.addEventListener('click', handle.dialog.previous);
        elems.modal.button.next.addEventListener('click', handle.dialog.next);
        elems.modal.button.send.addEventListener('click', handle.dialog.send);
        elems.modal.id.addEventListener('click', handle.dialog.outside);

        // run one time window width calculation handler
        handle.window.width();

        // Asynchronous data reading from external file (load result in questions variable)
        getData('questions.json').then((result) => questions = result.questions);
    }

    const saveResult = () => {
        const answer = [...elems.modal.form.id.elements]
            .filter((input) => input.checked || idx >= questions.length)
            .map((elem) => elem.value);

        result[idx] = {
            question: idx < questions.length ? questions[idx].question : 'User Info',
            answer: answer
        };
    };

    const renderResult = () => {
        elems.modal.form.question.textContent = 'Спасибо за ваш заказ!';
        elems.modal.form.answers.innerHTML = JSON.stringify(result);
    };

    // Render dialog quiz window
    const render = (id) => {
        if (id === idx) {
            return; // Skip rendering, if dialog page wasn't changed
        }
        idx = id;

        if (idx < questions.length) {
            renderQuestion();
        } else {
            renderClientInfo();
        }

        // Enable / Disable Prev / Next buttons. Depends on current page (idx)
        elems.modal.button.previous.disabled = idx <= 0;
        switch (true) {
            case idx < questions.length:
                elems.modal.button.next.classList.remove('d-none');
                elems.modal.button.send.classList.add('d-none');
                break;
            case idx === questions.length:
                elems.modal.button.next.classList.add('d-none');
                elems.modal.button.send.classList.remove('d-none');
                break;
        }

        function renderQuestion() {
            let q = questions[idx];
            // Poplate question in dialog
            elems.modal.form.question.textContent = q.question;

            // Populate answers in dialog
            elems.modal.form.answers.innerHTML = '';
            q.answers.forEach(row => {
                const elem = document.createElement('div');
                elem.classList.add('answers-item');
                elem.classList.add('d-flex');
                elem.classList.add(row.class);
                elem.innerHTML = `
                    <input type="${q.type}" id="${row.title}" name="answer" class="d-none" value="${row.title}"/>
                    <label for="${row.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${row.url}" alt="burger">
                        <span>${row.title}</span>
                    </label>
                `;
                elems.modal.form.answers.appendChild(elem);
            });

            if (result[idx]) {
                result[idx].answer.forEach(value => {
                    document.getElementById(value).checked = true;
                })
            }
        }

        function renderClientInfo() {
            elems.modal.form.question.textContent = 'Client information';
            elems.modal.form.answers.innerHTML = `
                <div class="form-group">
                    <label for="phone">Enter your phone number</label>
                    <input id="phone" type="phone" class="form-control" />
                </div>
            `;
            if (result[idx]) {
                result[idx].answer.forEach(value => {
                    document.getElementById('phone').value = value;
                })
            }
        }
    };

    // Transform CSS selectors to DOM elements
    function applySelector(obj) {
        function applyFunction(obj, fun, context) {
            let res = {};
            Object.keys(obj).forEach(function(key) {
                res[key] = typeof obj[key] === 'object' ?
                    applyFunction(obj[key], fun, context) :
                    fun.call(context, obj[key]);
            });
            return res;
        }

        return applyFunction(obj, document.querySelector, document);
    }

    // Reading data from file by url path
    async function getData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Can\'t read data from ${url}. Status code: ${response.status}`);
        }
        return await response.json();
    }

    /*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
!function(e,n,A){function o(e,n){return typeof e===n}function t(){var e,n,A,t,a,i,l;for(var f in r)if(r.hasOwnProperty(f)){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(A=0;A<n.options.aliases.length;A++)e.push(n.options.aliases[A].toLowerCase());for(t=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],l=i.split("."),1===l.length?Modernizr[l[0]]=t:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=t),s.push((t?"":"no-")+l.join("-"))}}function a(e){var n=u.className,A=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+A+"no-js(\\s|$)");n=n.replace(o,"$1"+A+"js$2")}Modernizr._config.enableClasses&&(n+=" "+A+e.join(" "+A),c?u.className.baseVal=n:u.className=n)}function i(e,n){if("object"==typeof e)for(var A in e)f(e,A)&&i(A,e[A]);else{e=e.toLowerCase();var o=e.split("."),t=Modernizr[o[0]];if(2==o.length&&(t=t[o[1]]),"undefined"!=typeof t)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),a([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var s=[],r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var A=this;setTimeout(function(){n(A[e])},0)},addTest:function(e,n,A){r.push({name:e,fn:n,options:A})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=n.documentElement,c="svg"===u.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;f=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,A){return e.call(n,A)}}(),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},l._trigger=function(e,n){if(this._l[e]){var A=this._l[e];setTimeout(function(){var e,o;for(e=0;e<A.length;e++)(o=A[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){l.addTest=i}),Modernizr.addAsyncTest(function(){function e(e,n,A){function o(n){var o=n&&"load"===n.type?1==t.width:!1,a="webp"===e;i(e,a&&o?new Boolean(o):o),A&&A(n)}var t=new Image;t.onerror=o,t.onload=o,t.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],A=n.shift();e(A.name,A.uri,function(A){if(A&&"load"===A.type)for(var o=0;o<n.length;o++)e(n[o].name,n[o].uri)})}),t(),a(s),delete l.addTest,delete l.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);

    init();
});
