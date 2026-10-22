(function () {
  var STYLES = [
    ":host{all:initial;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}",
    "*{box-sizing:border-box}",
    ".launcher{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;border:0;background:#0b5cad;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:2147483000}",
    ".panel{position:fixed;right:20px;bottom:88px;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 120px));display:flex;flex-direction:column;background:#fff;color:#1a1a1a;border:1px solid #d5d9de;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.2);overflow:hidden;z-index:2147483000}",
    ".panel[hidden]{display:none}",
    ".header{padding:12px 14px;background:#0b5cad;color:#fff;font-weight:600;font-size:14px;display:flex;justify-content:space-between;align-items:center}",
    ".close{background:none;border:0;color:#fff;font-size:18px;cursor:pointer}",
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
    ".sources{margin-top:6px;font-size:12px;color:#555;white-space:normal}",
    ".sources a{color:#0b5cad;margin-right:8px}",
    ".all-matches{margin-top:8px;font-size:13px}",
    ".all-matches summary{color:#0b5cad;cursor:pointer;font-weight:600}",
    ".all-matches ol{margin:6px 0 0;padding-left:24px;max-height:240px;overflow-y:auto}",
    ".all-matches li{margin:0 0 2px}",
    ".all-matches a{color:#0b5cad}",
    ".suggestions{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:100%}",
    ".suggestion{padding:6px 10px;border:1px solid #b7cde6;border-radius:14px;background:#fff;color:#0b5cad;font-size:13px;line-height:1.3;text-align:left;cursor:pointer}",
    ".suggestion:hover{background:#e6f0fa}",
    ".suggestion:disabled{opacity:.5;cursor:default}",
    ".disclaimer{padding:6px 12px 8px;font-size:11px;line-height:1.35;color:#6b7280;text-align:center}",
    ".version{font-family:ui-monospace,Menlo,monospace;white-space:nowrap}",
    ".form{display:flex;gap:8px;padding:10px;border-top:1px solid #e3e6ea}",
    ".form input{flex:1;padding:9px 10px;border:1px solid #c5cad0;border-radius:8px;font-size:14px}",
    ".form button{padding:9px 14px;border:0;border-radius:8px;background:#0b5cad;color:#fff;font-size:14px;cursor:pointer}",
    ".form button:disabled{opacity:.5;cursor:default}"
  ].join("");

  var MAX_HISTORY = 12;
  var REQUEST_TIMEOUT_MS = 45000;
  var MAX_RETRIES = 2;
  var MAX_RETRY_DELAY_MS = 10000;
  var DEFAULT_SUGGESTIONS = [
    "Who offers OT/ICS security testing?",
    "Which companies help with MAS TRM compliance?",
    "I need a penetration test for a mobile app",
    "Who provides incident response and recovery?",
    "Any providers of cybersecurity training for staff?"
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

  function appendInline(parent, text) {
    var lastIndex = 0;
    var match;
    INLINE_EMPHASIS.lastIndex = 0;
    while ((match = INLINE_EMPHASIS.exec(text)) !== null) {
      if (match.index > lastIndex) parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      parent.appendChild(match[1] !== undefined ? element("strong", "", match[1]) : element("em", "", match[2]));
      lastIndex = INLINE_EMPHASIS.lastIndex;
    }
    if (lastIndex < text.length) parent.appendChild(document.createTextNode(text.slice(lastIndex)));
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

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function retryDelayMs(response, attempt) {
    var header = response && response.headers ? Number(response.headers.get("retry-after")) : NaN;
    var fallback = 500 * Math.pow(2, attempt);
    var chosen = header > 0 ? header * 1000 : fallback;
    return Math.min(chosen, MAX_RETRY_DELAY_MS);
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
      if (error && error.name === "AbortError") throw new Error("The request timed out. Please try again.");
      throw new Error("Network error. Please check your connection and try again.");
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
    return response.status === 502 || response.status === 503 || response.status === 504;
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
    var busy = false;
    var suggestions = Array.isArray(config.suggestions) ? config.suggestions : DEFAULT_SUGGESTIONS;
    var suggestionList = null;

    var host = element("div");
    var root = host.attachShadow({ mode: "open" });
    var style = element("style");
    style.textContent = STYLES;

    var launcher = element("button", "launcher", "💬");
    launcher.setAttribute("aria-label", "Open catalogue chat");
    var panel = element("div", "panel");
    panel.hidden = !config.open;
    var header = element("div", "header");
    header.appendChild(element("span", "", config.title || "Cyber Catalogue Assistant"));
    var close = element("button", "close", "×");
    close.setAttribute("aria-label", "Close");
    header.appendChild(close);
    var log = element("div", "log");
    var disclaimer = element(
      "div",
      "disclaimer",
      "AI-generated from catalogue entries. Not an endorsement \u2014 verify details with the company."
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
    panel.appendChild(header);
    panel.appendChild(log);
    panel.appendChild(disclaimer);
    panel.appendChild(form);
    root.appendChild(style);
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
        body: JSON.stringify({ messages: history.slice(-MAX_HISTORY) })
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
        if (response.status === 503) throw new Error("The assistant is busy right now. Please try again shortly.");
        if (!response.ok) throw new Error("Something went wrong (" + response.status + ")");
        return response.json().then(validateBody);
      }, function (error) {
        if (attempt < MAX_RETRIES && /Network error|timed out/.test(error.message)) {
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
      history.push({ role: "user", content: text });
      var pending = addMessage("bot", "Thinking…");
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
        pending.textContent = error.message || "Network error";
      }).then(function () {
        busy = false;
        send.disabled = false;
        input.focus();
      });
    }

    function toggle(show) {
      panel.hidden = !show;
      if (show) input.focus();
    }

    launcher.addEventListener("click", function () { toggle(panel.hidden); });
    close.addEventListener("click", function () { toggle(false); });
    form.addEventListener("submit", submit);
    addMessage("bot", "Hi! Ask me about cybersecurity companies in the CyberSG catalogue, or try one of these:");
    addSuggestions();
  }

  window.TigChat = { mount: mount };
})();

TigChat.mount({
  apiBase: "https://tig.luarss.dev",
  accessKey: "+xXO5x3XMR50otuuSGRIM2PoWlGrBVNn"
});
