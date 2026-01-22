const FlowEchoWidget = (() => {
  console.log("FlowEcho widget script loaded");

  let state = "ACTIVE";

  const widget = document.createElement("div");
  widget.id = "flowecho-widget";

  const iconUrl = chrome.runtime.getURL("icons/icon.png");

  widget.innerHTML = `
    <div id="flowecho-panel">
      <button id="fe-pause">Pause</button>
      <button id="fe-stop">Stop</button>
      <button id="fe-dashboard">Dashboard</button>
      <button id="fe-chat">Chat</button>
    </div>

    <div id="flowecho-btn">
      <img src="${iconUrl}" class="flowecho-logo">
    </div>
  `;

  document.body.appendChild(widget);

  const msgStack = document.createElement("div");
  msgStack.id = "flowecho-msg-stack";
  widget.appendChild(msgStack);

  const panel = widget.querySelector("#flowecho-panel");
  const btn   = widget.querySelector("#flowecho-btn");

  function closePanel() {
    btn.classList.remove("open");
    panel.classList.remove("open");
  }

  // ---------------- Dragging ----------------
  let isDragging = false;
  let dragStarted = false;
  let offsetX = 0, offsetY = 0;

  btn.addEventListener("mousedown", e => {
    isDragging = true;
    dragStarted = false;
    offsetX = e.clientX - widget.offsetLeft;
    offsetY = e.clientY - widget.offsetTop;
    widget.style.transition = "none";
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const dx = e.clientX - offsetX;
    const dy = e.clientY - offsetY;

    if (!dragStarted && Math.abs(dx) + Math.abs(dy) < 4) return;
    dragStarted = true;

    widget.style.left = dx + "px";
    widget.style.top  = dy + "px";

    widget.style.bottom = "auto";
    widget.style.right  = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    widget.style.transition = "";
  });

  // ---------------- State handling ----------------
  function setState(newState) {
    state = newState;

    btn.classList.remove("active", "paused");
    widget.classList.remove("paused");

    if (state === "ACTIVE") {
      btn.classList.add("active");
    }

    if (state === "PAUSED") {
      btn.classList.add("paused");
      widget.classList.add("paused");   // << gray-out whole widget
    }

    if (state === "STOPPED") {
      widget.remove();
    }
  }


  // ---------------- Panel toggle (smooth) ----------------
  btn.addEventListener("click", () => {
    if (dragStarted || state === "STOPPED") return;

    btn.classList.toggle("open");
    panel.classList.toggle("open");
  });

  // ---------------- Actions ----------------
  const pauseBtn = widget.querySelector("#fe-pause");

  pauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (state === "ACTIVE") {
      setState("PAUSED");
      pauseBtn.textContent = "Continue";
    } else if (state === "PAUSED") {
      setState("ACTIVE");
      pauseBtn.textContent = "Pause";
    }

    closePanel(); // auto-close
  });

  widget.querySelector("#fe-stop").onclick = () => {
    setState("STOPPED");
    chrome.runtime.sendMessage({ type: "FLOWECHO_STOP" });
    closePanel();
  };

  widget.querySelector("#fe-dashboard").onclick = () => {
    chrome.runtime.sendMessage({ type: "OPEN_DASHBOARD" });
    closePanel();
  };

  widget.querySelector("#fe-chat").onclick = () => {
    chrome.runtime.sendMessage({ type: "OPEN_CHAT" });
    closePanel();
  };

  function pushMessage(text) {
    const el = document.createElement("div");
    el.className = "flowecho-msg";
    el.textContent = "";
    msgStack.appendChild(el);

    requestAnimationFrame(() => el.classList.add("show"));

    let i = 0;

    // --- typing (calm) ---
    const type = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, 55);
      } else {
        holdThenErase();
      }
    };

    // --- pause before erase ---
    const holdThenErase = () => {
      setTimeout(() => erase(), 2600);
    };

    // --- LEFT → RIGHT erase ---
    const erase = () => {
      let t = 0;

      const step = () => {
        if (t < text.length) {
          el.textContent = text.slice(t++);  // remove from start forward
          setTimeout(step, 38);              // ← smooth wipe speed
        } else {
          el.classList.remove("show");
          el.classList.add("erase");
          setTimeout(() => el.remove(), 450);
        }
      };

      step();
    };

    type();

    // overflow safety — fast fade old messages
    const msgs = [...msgStack.children];
    if (msgs.length > 6) {
      const overflow = msgs.slice(0, msgs.length - 6);
      overflow.forEach(m => {
        m.classList.remove("show");
        m.classList.add("fade-fast");
        setTimeout(() => m.remove(), 180);
      });
    }
  }



  window.addEventListener("message", e => {
    if (e.data?.type === "FE_PUSH") {
      pushMessage(e.data.text);
    }
  });



  setState("ACTIVE");

  return { setState };
})();

