(function () {
  var LAUNCHER_ICON = "data:image/webp;base64,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";
  var STYLES = [
    ":host{all:initial;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}",
    "*{box-sizing:border-box}",
    ".launcher{position:fixed;right:20px;bottom:20px;width:76px;height:76px;padding:0;border:0;background:transparent url(\"" + LAUNCHER_ICON + "\") center/contain no-repeat;cursor:pointer;filter:drop-shadow(0 4px 8px rgba(0,0,0,.25));z-index:2147483000}",
    ".teaser{position:fixed;right:20px;bottom:112px;max-width:calc(100vw - 40px);padding:16px 24px;border:1px solid #d5d9de;border-radius:18px;background:#fff;color:#1a1a1a;font:500 20px/1.3 system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.12);z-index:2147483000}",
    ".teaser::after{content:'';position:absolute;right:30px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #d5d9de;border-bottom:1px solid #d5d9de;transform:rotate(45deg)}",
    ".teaser[hidden]{display:none}",
    ".panel{position:fixed;right:20px;bottom:108px;width:min(max(480px,50vw),calc(100vw - 32px));height:calc(100vh - 140px);display:flex;flex-direction:column;background:#fff;color:#1a1a1a;border:1px solid #d5d9de;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.2);overflow:hidden;z-index:2147483000}",
    ".panel[hidden]{display:none}",
    ".panel.compact{width:min(380px,calc(100vw - 32px));height:min(640px,calc(100vh - 140px))}",
    ".header{padding:12px 14px;background:#0b5cad;color:#fff;font-weight:600;font-size:14px;display:flex;justify-content:space-between;align-items:center}",
    ".controls{display:flex;align-items:center;gap:4px}",
    ".close,.resize{background:none;border:0;color:#fff;font-size:18px;line-height:1;cursor:pointer}",
    ".log{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.45}",
    ".msg{max-width:90%;padding:8px 10px;border-radius:10px;white-space:pre-wrap;word-wrap:break-word}",
    ".user{align-self:flex-end;background:#e6f0fa}",
    ".bot{align-self:flex-start;background:#f1f3f5}",
    ".rich{white-space:normal}",
    ".rich p{margin:0 0 6px}",
    ".rich ul,.rich ol{margin:0 0 6px;padding-left:20px}",
    ".rich li{margin:0 0 4px}",
    ".rich>:last-child{margin-bottom:0}",
    ".error{align-self:flex-start;background:#fdecea;color:#8a1c14}",
    ".retry{display:block;margin-top:8px;padding:5px 10px;border:1px solid #8a1c14;border-radius:8px;background:#fff;color:#8a1c14;font-size:13px;cursor:pointer}",
    ".support{margin-top:6px;font-size:12px;color:#8a1c14}",
    ".sources{margin-top:6px;font-size:12px;color:#555;white-space:normal}",
    ".sources a{color:#0b5cad;margin-right:8px}",
    ".all-matches{margin-top:8px;font-size:13px}",
    ".all-matches summary{color:#0b5cad;cursor:pointer;font-weight:600}",
    ".all-matches ol{margin:6px 0 0;padding-left:24px;max-height:240px;overflow-y:auto}",
    ".all-matches li{margin:0 0 2px}",
    ".all-matches a{color:#0b5cad}",
    ".rich a{color:#0b5cad}",
    ".suggestions{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:100%}",
    ".suggestion{padding:6px 10px;border:1px solid #b7cde6;border-radius:14px;background:#fff;color:#0b5cad;font-size:13px;line-height:1.3;text-align:left;cursor:pointer}",
    ".suggestion:hover{background:#e6f0fa}",
    ".suggestion:disabled{opacity:.5;cursor:default}",
    ".disclaimer{padding:6px 12px 8px;font-size:11px;line-height:1.35;color:#6b7280;text-align:center}",
    ".version{font-family:ui-monospace,Menlo,monospace;white-space:nowrap}",
    ".form{display:flex;gap:8px;padding:10px;border-top:1px solid #e3e6ea}",
    ".form input{flex:1;padding:9px 10px;border:1px solid #c5cad0;border-radius:8px;font-size:14px}",
    ".form button{padding:9px 14px;border:0;border-radius:8px;background:#0b5cad;color:#fff;font-size:14px;cursor:pointer}",
    ".form button:disabled{opacity:.5;cursor:default}",
    ".credit{padding:0 12px 8px;font-size:11px;color:#6b7280;text-align:center}",
    ".credit a{color:#0b5cad;text-decoration:none}",
    ".credit a:hover{text-decoration:underline}",
    ".heart{color:#e11d48}"
  ].join("");

  var MAX_HISTORY = 12;
  var REQUEST_TIMEOUT_MS = 45000;
  var MAX_RETRIES = 2;
  var MAX_RETRY_DELAY_MS = 10000;
  var UNAVAILABLE_MESSAGE = "The assistant is temporarily unavailable. Please try again in a few minutes.";
  var BUSY_MESSAGE = "The assistant is busy right now. Please try again shortly.";
  var OFFLINE_MESSAGE = "You appear to be offline. Please check your connection and try again.";
  var SUPPORT_EMAIL = "louiswong@nusx.edu.sg";
  var DEFAULT_SUGGESTIONS = [
    "Who offers OT/ICS security testing?",
    "Which companies help with MAS TRM compliance?",
    "I need a penetration test for a mobile app",
    "Who provides incident response and recovery?",
    "Any providers of cybersecurity training for staff?",
    "What are the solutions that can improve my cyber posture?",
    "How can I improve my organisation's cybersecurity posture?",
    "How to respond against cyber threats? What solutions of measures can I undertake?"
  ];

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  var BULLET_LINE = /^\s*[*\-\u2022]\s+(.*)$/;
  var NUMBERED_LINE = /^\s*\d+[.)]\s+(.*)$/;
  var INLINE_EMPHASIS = /\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*/g;
  var MARKDOWN_LINK = /\[([^\]]+)\]\((https:\/\/[^\s()<>"']+)\)/g;
  var INLINE_URL = /(?:https?:\/\/|www\.)[^\s<>"'()\[\]]+/gi;
  var TRAILING_PUNCTUATION = /[.,;:!?]+$/;
  var LINKED_DOMAINS = ["scamshield.gov.sg", "csa.gov.sg"];

  function linkTarget(text) {
    var href = /^www\./i.test(text) ? "https://" + text : text;
    try {
      var url = new URL(href);
      var host = url.hostname.toLowerCase();
      var linked = url.protocol === "https:" && LINKED_DOMAINS.some(function (domain) {
        return host === domain || host.slice(-domain.length - 1) === "." + domain;
      });
      return linked ? url.href : null;
    } catch (error) {
      return null;
    }
  }

  function appendLink(parent, label, href) {
    var link = element("a", "", label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    parent.appendChild(link);
  }

  function appendLabelledLinks(parent, text) {
    var lastIndex = 0;
    var match;
    MARKDOWN_LINK.lastIndex = 0;
    while ((match = MARKDOWN_LINK.exec(text)) !== null) {
      var href = linkTarget(match[2]);
      if (match.index > lastIndex) appendLinkedText(parent, text.slice(lastIndex, match.index));
      if (href) appendLink(parent, match[1], href);
      else parent.appendChild(document.createTextNode(match[1]));
      lastIndex = MARKDOWN_LINK.lastIndex;
    }
    if (lastIndex < text.length) appendLinkedText(parent, text.slice(lastIndex));
  }

  function appendLinkedText(parent, text) {
    var lastIndex = 0;
    var match;
    INLINE_URL.lastIndex = 0;
    while ((match = INLINE_URL.exec(text)) !== null) {
      var urlText = match[0].replace(TRAILING_PUNCTUATION, "");
      var href = linkTarget(urlText);
      if (!href) continue;
      if (match.index > lastIndex) parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      appendLink(parent, urlText, href);
      lastIndex = match.index + urlText.length;
    }
    if (lastIndex < text.length) parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  function appendInline(parent, text) {
    var lastIndex = 0;
    var match;
    INLINE_EMPHASIS.lastIndex = 0;
    while ((match = INLINE_EMPHASIS.exec(text)) !== null) {
      if (match.index > lastIndex) appendLabelledLinks(parent, text.slice(lastIndex, match.index));
      parent.appendChild(match[1] !== undefined ? element("strong", "", match[1]) : element("em", "", match[2]));
      lastIndex = INLINE_EMPHASIS.lastIndex;
    }
    if (lastIndex < text.length) appendLabelledLinks(parent, text.slice(lastIndex));
  }

  function renderMarkdown(container, text) {
    var list = null;
    var listTag = null;
    text.split(/\r?\n/).forEach(function (line) {
      var bullet = BULLET_LINE.exec(line);
      var numbered = bullet ? null : NUMBERED_LINE.exec(line);
      var item = bullet || numbered;
      if (item) {
        var tag = bullet ? "ul" : "ol";
        if (!list || listTag !== tag) {
          list = element(tag);
          listTag = tag;
          container.appendChild(list);
        }
        var listItem = element("li");
        appendInline(listItem, item[1]);
        list.appendChild(listItem);
        return;
      }
      list = null;
      listTag = null;
      if (!line.trim()) return;
      var paragraph = element("p");
      appendInline(paragraph, line.trim());
      container.appendChild(paragraph);
    });
  }

  function isHttpUrl(value) {
    return /^https?:\/\//i.test(value || "");
  }

  function isAllowedApiBase(value) {
    return /^https:\/\//i.test(value || "") || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(value || "");
  }

  function newConversationId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);
  }

  function userTurnCount(messages) {
    return messages.filter(function (message) { return message.role === "user"; }).length;
  }

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function retryDelayMs(response, attempt) {
    var header = response && response.headers ? Number(response.headers.get("retry-after")) : NaN;
    var fallback = 500 * Math.pow(2, attempt);
    var chosen = header > 0 ? header * 1000 : fallback;
    return Math.min(chosen, MAX_RETRY_DELAY_MS);
  }

  function retryableError(message) {
    var error = new Error(message);
    error.retryable = true;
    return error;
  }

  function unavailableError() {
    if (navigator.onLine === false) return retryableError(OFFLINE_MESSAGE);
    return retryableError(UNAVAILABLE_MESSAGE);
  }

  function serviceUnavailableError(response) {
    return response.json().then(function (body) {
      if (body && body.error === "busy") return retryableError(BUSY_MESSAGE);
      return unavailableError();
    }, function () {
      return unavailableError();
    });
  }

  function fetchWithTimeout(url, options) {
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS) : null;
    if (controller) options.signal = controller.signal;
    return fetch(url, options).then(function (response) {
      if (timer) clearTimeout(timer);
      return response;
    }, function (error) {
      if (timer) clearTimeout(timer);
      if (error && error.name === "AbortError") throw retryableError("The request timed out. Please try again.");
      throw unavailableError();
    });
  }

  var VERSION_PATTERN = /^[0-9a-f]{7,40}(-dirty)?$/;

  function showVersion(apiBase, disclaimer) {
    fetchWithTimeout(apiBase + "/healthz", { method: "GET" }).then(function (response) {
      return response.ok ? response.json() : null;
    }).then(function (body) {
      if (!body || typeof body.version !== "string" || !VERSION_PATTERN.test(body.version)) return;
      disclaimer.appendChild(element("span", "version", " \u00b7 build " + body.version));
    }, function () {});
  }

  function isTransient(response) {
    return response.status === 502 || response.status === 503 || response.status === 504 ||
      (response.status >= 520 && response.status <= 530);
  }

  function validateBody(body) {
    if (!body || typeof body.answer !== "string") throw new Error("Unexpected response from the server.");
    body.sources = Array.isArray(body.sources) ? body.sources.filter(function (source) {
      return source && typeof source.name === "string" && typeof source.website === "string";
    }) : [];
    body.all_matches = Array.isArray(body.all_matches) ? body.all_matches.filter(function (match) {
      return match && typeof match.name === "string" && typeof match.website === "string";
    }) : [];
    return body;
  }

  function mount(config) {
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", function () { mount(config); });
      return;
    }
    if (!config || !isAllowedApiBase(config.apiBase) || typeof config.accessKey !== "string") {
      console.error("TigChat: apiBase must be an https URL and accessKey must be set");
      return;
    }
    var apiBase = config.apiBase.replace(/\/$/, "");
    var token = null;
    var history = [];
    var conversationId = newConversationId();
    var busy = false;
    var suggestions = Array.isArray(config.suggestions) ? config.suggestions : DEFAULT_SUGGESTIONS;
    var suggestionList = null;

    var host = element("div");
    var root = host.attachShadow({ mode: "open" });
    var style = element("style");
    style.textContent = STYLES;

    var launcher = element("button", "launcher");
    launcher.setAttribute("aria-label", "Open directory chat");
    var teaser = element("button", "teaser", config.teaser || "Have a question? Chat with us");
    teaser.type = "button";
    var panel = element("div", "panel");
    panel.hidden = !config.open;
    teaser.hidden = !panel.hidden;
    var header = element("div", "header");
    header.appendChild(element("span", "", config.title || "CyberSG Atlas Assistant"));
    var controls = element("div", "controls");
    var resize = element("button", "resize");
    resize.type = "button";
    var close = element("button", "close", "×");
    close.setAttribute("aria-label", "Close");
    controls.appendChild(resize);
    controls.appendChild(close);
    header.appendChild(controls);
    var log = element("div", "log");
    var disclaimer = element(
      "div",
      "disclaimer",
      "AI-generated from directory entries. Not an endorsement \u2014 verify details with the company."
    );
    var form = element("form", "form");
    var input = element("input");
    input.type = "text";
    input.maxLength = 1000;
    input.placeholder = "Ask about Singapore cyber companies";
    var send = element("button", "", "Send");
    send.type = "submit";
    form.appendChild(input);
    form.appendChild(send);
    var credit = element("div", "credit", "Made with ");
    var heart = element("span", "heart", "♥");
    heart.setAttribute("aria-label", "love");
    credit.appendChild(heart);
    credit.appendChild(document.createTextNode(" by "));
    var creditLink = element("a", "", "NUSX Labs");
    creditLink.href = "https://github.com/nus-etp";
    creditLink.target = "_blank";
    creditLink.rel = "noopener noreferrer";
    credit.appendChild(creditLink);
    panel.appendChild(header);
    panel.appendChild(log);
    panel.appendChild(disclaimer);
    panel.appendChild(form);
    panel.appendChild(credit);
    root.appendChild(style);
    root.appendChild(teaser);
    root.appendChild(launcher);
    root.appendChild(panel);
    document.body.appendChild(host);
    showVersion(apiBase, disclaimer);

    function addMessage(className, text) {
      var node = element("div", "msg " + className, text);
      log.appendChild(node);
      log.scrollTop = log.scrollHeight;
      return node;
    }

    function addSources(messageNode, sources) {
      var linked = sources.filter(function (source) {
        return isHttpUrl(source.website);
      });
      if (!linked.length) return;
      var container = element("div", "sources");
      linked.forEach(function (source) {
        var link = element("a", "", source.name);
        link.href = source.website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        container.appendChild(link);
      });
      messageNode.appendChild(container);
    }

    function addAllMatches(messageNode, matches) {
      if (!matches.length) return;
      var details = element("details", "all-matches");
      details.appendChild(element("summary", "", "View all " + matches.length + " matching companies"));
      var list = element("ol");
      matches.forEach(function (match) {
        var item = element("li");
        if (isHttpUrl(match.website)) {
          var link = element("a", "", match.name);
          link.href = match.website;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          item.appendChild(link);
        } else {
          item.textContent = match.name;
        }
        list.appendChild(item);
      });
      details.appendChild(list);
      messageNode.appendChild(details);
    }

    function authenticate() {
      return fetchWithTimeout(apiBase + "/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ key: config.accessKey })
      }).then(function (response) {
        if (response.status === 429) throw new Error("Too many attempts. Please wait a moment and try again.");
        if (response.status >= 500) throw unavailableError();
        if (!response.ok) throw new Error("Access denied (" + response.status + ")");
        return response.json();
      }).then(function (body) {
        if (!body || typeof body.token !== "string") throw new Error("Unexpected response from the server.");
        token = body.token;
      });
    }

    function postChat() {
      return fetchWithTimeout(apiBase + "/chat", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: "Bearer " + token },
        body: JSON.stringify({
          messages: history.slice(-MAX_HISTORY),
          conversation_id: conversationId,
          turn_index: userTurnCount(history),
          channel: "widget"
        })
      });
    }

    function requestAnswer(attempt) {
      attempt = attempt || 0;
      var ready = token ? Promise.resolve() : authenticate();
      return ready.then(postChat).then(function (response) {
        if (response.status !== 401) return response;
        token = null;
        return authenticate().then(postChat);
      }).then(function (response) {
        if (isTransient(response) && attempt < MAX_RETRIES) {
          return delay(retryDelayMs(response, attempt)).then(function () { return requestAnswer(attempt + 1); });
        }
        if (response.status === 429) throw new Error("Rate limit reached. Please try again later.");
        if (response.status === 503) return serviceUnavailableError(response).then(function (error) { throw error; });
        if (response.status >= 500) throw unavailableError();
        if (!response.ok) throw new Error("Something went wrong (" + response.status + ")");
        return response.json().then(validateBody);
      }, function (error) {
        if (attempt < MAX_RETRIES && error.retryable) {
          return delay(retryDelayMs(null, attempt)).then(function () { return requestAnswer(attempt + 1); });
        }
        throw error;
      });
    }

    function addSuggestions() {
      var questions = suggestions.filter(function (question) {
        return typeof question === "string" && question.trim();
      });
      if (!questions.length) return;
      suggestionList = element("div", "suggestions");
      questions.forEach(function (question) {
        var chip = element("button", "suggestion", question);
        chip.type = "button";
        chip.addEventListener("click", function () { ask(question); });
        suggestionList.appendChild(chip);
      });
      log.appendChild(suggestionList);
    }

    function removeSuggestions() {
      if (!suggestionList) return;
      suggestionList.remove();
      suggestionList = null;
    }

    function submit(event) {
      event.preventDefault();
      ask(input.value);
    }

    function ask(rawText) {
      var text = (rawText || "").trim();
      if (!text || busy) return;
      busy = true;
      send.disabled = true;
      input.value = "";
      removeSuggestions();
      addMessage("user", text);
      answer(text, addMessage("bot", "Thinking…"));
    }

    function addRetryButton(pending, text) {
      var retry = element("button", "retry", "Try again");
      retry.type = "button";
      retry.addEventListener("click", function () {
        if (busy) return;
        busy = true;
        send.disabled = true;
        pending.className = "msg bot";
        pending.textContent = "Thinking…";
        answer(text, pending);
      });
      pending.appendChild(retry);
      pending.appendChild(element("div", "support", "If this keeps happening, email " + SUPPORT_EMAIL + "."));
    }

    function answer(text, pending) {
      history.push({ role: "user", content: text });
      requestAnswer().then(function (body) {
        pending.textContent = "";
        pending.classList.add("rich");
        renderMarkdown(pending, body.answer);
        addAllMatches(pending, body.all_matches);
        addSources(pending, body.sources);
        history.push({ role: "assistant", content: body.answer, signature: body.signature });
      }).catch(function (error) {
        history.pop();
        pending.className = "msg error";
        pending.textContent = error.message || UNAVAILABLE_MESSAGE;
        if (error.retryable) addRetryButton(pending, text);
      }).then(function () {
        busy = false;
        send.disabled = false;
        input.focus();
      });
    }

    function setCompact(compact) {
      panel.classList.toggle("compact", compact);
      resize.textContent = compact ? "\u2922" : "\u2013";
      resize.setAttribute("aria-label", compact ? "Maximise" : "Minimise");
      resize.title = compact ? "Maximise" : "Minimise";
    }

    function toggle(show) {
      panel.hidden = !show;
      teaser.hidden = show;
      if (show) input.focus();
    }

    launcher.addEventListener("click", function () { toggle(panel.hidden); });
    close.addEventListener("click", function () { toggle(false); });
    resize.addEventListener("click", function () { setCompact(!panel.classList.contains("compact")); });
    setCompact(Boolean(config.compact));
    teaser.addEventListener("click", function () { toggle(true); });
    form.addEventListener("submit", submit);
    addMessage("bot", "Hi! Ask me about cybersecurity companies in the directory, or try one of these:");
    addSuggestions();
  }

  window.TigChat = { mount: mount };
})();

TigChat.mount({
  apiBase: "https://tig.luarss.dev",
  accessKey: "+xXO5x3XMR50otuuSGRIM2PoWlGrBVNn"
});
