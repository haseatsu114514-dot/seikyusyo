const STORAGE_KEY = "video-project-invoice-clone-v1";

const STATUSES = [
  { id: "accepted", label: "受注", color: "#64748b" },
  { id: "editing", label: "編集中", color: "#f3a51d" },
  { id: "review", label: "確認待ち", color: "#6f5cf5" },
  { id: "delivered", label: "納品済み", color: "#21b785" },
];

const EXPENSE_CATEGORIES = ["ソフトウェア", "素材", "外注費", "交通費", "通信費", "備品", "広告費", "その他"];
const LEGACY_DEMO_CLIENT_IDS = new Set(["client-techbase", "client-bloom", "client-cafe"]);
const LEGACY_DEMO_ISSUER_IDS = new Set(["issuer-test"]);
const LEGACY_DEMO_PROJECT_IDS = new Set(Array.from({ length: 13 }, (_, index) => `p-${String(index + 1).padStart(3, "0")}`));
const LEGACY_DEMO_EXPENSE_IDS = new Set(Array.from({ length: 4 }, (_, index) => `e-${String(index + 1).padStart(3, "0")}`));

const seedState = {
  selectedMonth: getCurrentMonthInput(),
  clients: [
    {
      id: "client-kitakore",
      name: "株式会社キタコレ",
      shortName: "キタコレ",
      postal: "105-0013",
      address: "東京都港区浜松町2-2-15 浜松町ダイヤビル2F",
      contact: "",
      email: "",
      registration: "",
      defaultDueRule: "currentMonthEnd",
      defaultWithholdingMode: "enabled",
      defaultItemPresetId: "item-office-work-a",
      defaultInvoiceTemplateId: "template-standard",
      defaultDiscountRate: 2,
    },
    {
      id: "client-lead-innovation",
      name: "株式会社LeadInnovation",
      shortName: "LeadInnovation",
      postal: "",
      address: "",
      contact: "スズキサトミ",
      email: "",
      registration: "",
      defaultDueRule: "currentMonth20",
      defaultWithholdingMode: "none",
      defaultItemPresetId: "item-office-work-a",
      defaultInvoiceTemplateId: "template-suzuki-sheet",
      defaultDiscountRate: 0,
    },
  ],
  issuerProfiles: [
    {
      id: "issuer-hasegawa",
      name: "長谷川貴紀",
      postal: "451-0053",
      address: "愛知県名古屋市西区枇杷島1丁目7-1",
      phone: "090-6469-2516",
      registration: "",
      bankName: "住信SBIネット銀行",
      bankCode: "0038",
      bankBranch: "キウイ支店",
      branchCode: "109",
      bankType: "普通預金",
      bankNumber: "8580887",
      bankHolder: "ハセガワアツキ",
    },
  ],
  itemPresets: [
    {
      id: "item-video-editing-variable",
      name: "動画編集",
      unit: "式",
      unitPrice: 0,
      description: "",
    },
    {
      id: "item-video-revision-variable",
      name: "動画修正",
      unit: "式",
      unitPrice: 0,
      description: "",
    },
    {
      id: "item-office-work-a",
      name: "事務作業A",
      unit: "件",
      unitPrice: 50,
      description: "",
    },
    {
      id: "item-bb",
      name: "事務作業B",
      unit: "件",
      unitPrice: 150,
      description: "",
    },
  ],
  invoiceTemplates: [
    {
      id: "template-standard",
      name: "標準フォーマット",
      type: "standard",
      spreadsheetId: "",
      sourceUrl: "",
    },
    {
      id: "template-suzuki-sheet",
      name: "スズキ様用（共有シート雛形）",
      type: "suzukiSpreadsheet",
      spreadsheetId: "1VbXz5CbTipmvIixvmm2DWT881tNnQLlN",
      sourceUrl: "https://docs.google.com/spreadsheets/d/1VbXz5CbTipmvIixvmm2DWT881tNnQLlN/edit?gid=1240519593#gid=1240519593",
      localTemplatePath: "./templates/suzuki-invoice-template.xlsx",
    },
  ],
  invoicePresets: [
    {
      id: "invoice-2026-06-kitakore-office",
      name: "2026年6月 キタコレ（事務作業）",
      targetMonth: "2026-06",
      clientId: "client-kitakore",
      issuerId: "issuer-hasegawa",
      issueDate: "2026-06-10",
      dueDate: "2026-07-20",
      taxMode: "none",
      withholdingMode: "enabled",
      templateId: "template-standard",
      discountRate: 2,
      invoiceNo: "202606-01",
      itemPresetId: "item-office-work-a",
      manualItems: [
        { id: "preset-202606-kitakore-a", name: "事務作業A", unit: "件", unitPrice: 50, quantity: 579, description: "" },
        { id: "preset-202606-kitakore-b", name: "事務作業B", unit: "件", unitPrice: 150, quantity: 133, description: "" },
        { id: "preset-202606-kitakore-communication", name: "通信費", unit: "式", unitPrice: 2790, quantity: 1, description: "" },
      ],
    },
    {
      id: "invoice-2026-06-kitakore-video",
      name: "2026年6月 キタコレ（動画編集）",
      targetMonth: "2026-06",
      clientId: "client-kitakore",
      issuerId: "issuer-hasegawa",
      issueDate: "2026-06-10",
      dueDate: "2026-07-20",
      taxMode: "none",
      withholdingMode: "enabled",
      templateId: "template-standard",
      discountRate: 2,
      invoiceNo: "202606-02",
      itemPresetId: "item-video-editing-variable",
      manualItems: [
        { id: "preset-202606-kitakore-video", name: "動画編集", unit: "式", unitPrice: 8000, quantity: 1, description: "" },
      ],
    },
    {
      id: "invoice-2026-06-lead-innovation",
      name: "2026年6月 LeadInnovation（スズキサトミ様）",
      targetMonth: "2026-06",
      clientId: "client-lead-innovation",
      issuerId: "issuer-hasegawa",
      issueDate: "2026-06-10",
      dueDate: "2026-07-20",
      taxMode: "none",
      withholdingMode: "none",
      templateId: "template-suzuki-sheet",
      discountRate: 0,
      invoiceNo: "202606-03",
      itemPresetId: "item-office-work-a",
      manualItems: [
        { id: "preset-202606-lead-a", name: "事務作業A", unit: "件", unitPrice: 50, quantity: 127, description: "" },
      ],
    },
  ],
  projects: [],
  expenses: [],
};

let state = loadState();
let draggedProjectId = null;
let toastTimer = null;

const boardEl = document.getElementById("board");
const modalRoot = document.getElementById("modal-root");
const toastEl = document.getElementById("toast");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("new-project-button").addEventListener("click", () => openProjectModal());
  document.getElementById("clients-button").addEventListener("click", () => openClientModal());
  document.getElementById("items-button").addEventListener("click", () => openItemPresetModal());
  document.getElementById("expenses-button").addEventListener("click", () => openExpenseModal());
  document.getElementById("settings-button").addEventListener("click", () => openSettingsModal());
  document.getElementById("invoice-button").addEventListener("click", () => openInvoiceModal());
  document.getElementById("month-picker").addEventListener("change", (event) => {
    state.selectedMonth = event.target.value || state.selectedMonth;
    saveState();
    render();
  });
  document.getElementById("prev-month-button").addEventListener("click", () => shiftSelectedMonth(-1));
  document.getElementById("next-month-button").addEventListener("click", () => shiftSelectedMonth(1));
  render();
});

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(seedState);
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(seedState),
      ...parsed,
      selectedMonth: parsed.selectedMonth || seedState.selectedMonth,
      clients: mergeById(
        seedState.clients,
        Array.isArray(parsed.clients) ? parsed.clients.filter((client) => !LEGACY_DEMO_CLIENT_IDS.has(client.id)) : [],
      ),
      issuerProfiles: mergeById(
        seedState.issuerProfiles,
        Array.isArray(parsed.issuerProfiles) ? parsed.issuerProfiles.filter((issuer) => !LEGACY_DEMO_ISSUER_IDS.has(issuer.id)) : [],
      ),
      itemPresets: mergeById(seedState.itemPresets, parsed.itemPresets)
        .filter((item) => item.id !== "item-video-editing")
        .map((item) => (
          item.id === "item-bb" && item.name === "事務作業 B"
            ? { ...item, name: "事務作業B" }
            : item
        )),
      invoiceTemplates: mergeById(seedState.invoiceTemplates, parsed.invoiceTemplates),
      invoicePresets: mergeById(seedState.invoicePresets, parsed.invoicePresets),
      projects: Array.isArray(parsed.projects)
        ? parsed.projects.filter((project) => !LEGACY_DEMO_PROJECT_IDS.has(project.id))
        : [],
      expenses: Array.isArray(parsed.expenses)
        ? parsed.expenses.filter((expense) => !LEGACY_DEMO_EXPENSE_IDS.has(expense.id))
        : [],
      settings: {},
    };
  } catch {
    return structuredClone(seedState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  renderSummary();
  renderMonthlyMetrics();
  renderBoard();
  refreshIcons();
}

function renderSummary() {
  const monthProjects = getSelectedMonthProjects();
  const activeCount = monthProjects.filter((project) => project.status !== "delivered").length;
  const deliveredCount = monthProjects.filter((project) => project.status === "delivered").length;

  document.getElementById("month-picker").value = state.selectedMonth;
  document.getElementById("active-count").textContent = String(activeCount);
  document.getElementById("delivered-count").textContent = String(deliveredCount);
}

function renderMonthlyMetrics() {
  const monthProjects = getSelectedMonthProjects();
  const revenue = getMonthRevenue(state.selectedMonth);
  const expenses = getMonthExpenses(state.selectedMonth).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  document.getElementById("month-revenue").textContent = formatCurrency(revenue);
  document.getElementById("month-expenses").textContent = formatCurrency(expenses);
  document.getElementById("month-profit").textContent = formatCurrency(revenue - expenses);
  document.getElementById("month-projects").textContent = String(monthProjects.length);
}

function renderBoard() {
  boardEl.innerHTML = STATUSES.map((status) => renderColumn(status)).join("");
  boardEl.querySelectorAll(".deal-card").forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card.dataset.id));
    card.addEventListener("dragstart", (event) => {
      draggedProjectId = card.dataset.id;
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
    });
    card.addEventListener("dragend", () => {
      draggedProjectId = null;
      card.classList.remove("dragging");
      document.querySelectorAll(".dropzone").forEach((zone) => zone.classList.remove("drag-over"));
    });
  });

  boardEl.querySelectorAll(".dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");
      if (!draggedProjectId) return;
      const project = state.projects.find((item) => item.id === draggedProjectId);
      if (!project) return;
      project.status = zone.dataset.status;
      saveState();
      render();
      showToast("ステータスを更新しました");
    });
  });
}

function renderColumn(status) {
  const projects = getSelectedMonthProjects().filter((project) => project.status === status.id);
  const cards = projects.length
    ? projects.map((project) => renderProjectCard(project, status)).join("")
    : '<div class="empty-column">案件なし</div>';

  return `
    <section class="column" style="--status:${status.color}">
      <header class="column-header">
        <div class="column-title">
          <span class="status-dot" aria-hidden="true"></span>
          <span>${escapeHtml(status.label)}</span>
        </div>
        <span class="count-pill">${projects.length}</span>
      </header>
      <div class="dropzone" data-status="${status.id}">
        ${cards}
      </div>
    </section>
  `;
}

function renderProjectCard(project, status) {
  const client = getClient(project.clientId);
  const alertClass = project.status === "editing" && isDueSoon(project.dueDate) ? " alert" : "";
  return `
    <button class="deal-card" type="button" draggable="true" data-id="${project.id}" style="--status:${status.color}">
      <div class="client-name">${escapeHtml(client.name)}</div>
      <div class="deal-title">${escapeHtml(project.title)}</div>
      <div class="card-bottom">
        <div class="due-date${alertClass}">納期 ${formatShortDate(project.dueDate)}</div>
        <div class="amount">${formatCurrency(project.amount)}</div>
      </div>
    </button>
  `;
}

function openProjectModal(projectId) {
  const isEditing = Boolean(projectId);
  const project =
    state.projects.find((item) => item.id === projectId) ||
    {
      clientId: state.clients[0]?.id || "",
      title: "",
      dueDate: `${state.selectedMonth}-15`,
      status: "accepted",
      amount: "",
      note: "",
    };

  openModal(`
    <div class="modal">
      ${modalHeader(isEditing ? "案件の編集" : "新規案件")}
      <form class="modal-body" id="project-form">
        <div class="form-grid">
          <div class="field full">
            <label for="project-client">クライアント名</label>
            <select id="project-client" name="clientId" required>
              ${state.clients.map((client) => option(client.id, client.name, project.clientId)).join("")}
            </select>
          </div>
          <div class="field full">
            <label for="project-title">案件名</label>
            <input id="project-title" name="title" value="${escapeAttr(project.title)}" placeholder="例: YouTube 6月分 #12" required />
          </div>
          <div class="field">
            <label for="project-due">納期</label>
            <input id="project-due" name="dueDate" type="date" value="${escapeAttr(project.dueDate)}" required />
          </div>
          <div class="field">
            <label for="project-status">ステータス</label>
            <select id="project-status" name="status">
              ${STATUSES.map((status) => option(status.id, status.label, project.status)).join("")}
            </select>
          </div>
          <div class="field full">
            <label for="project-amount">単価（円）</label>
            <input id="project-amount" name="amount" inputmode="numeric" value="${escapeAttr(project.amount)}" placeholder="例: 30000" required />
          </div>
          <div class="field full">
            <label for="project-note">案件情報（素材リンク・参考動画・指示など自由に）</label>
            <textarea id="project-note" name="note" placeholder="素材リンク:">${escapeHtml(project.note || "")}</textarea>
          </div>
        </div>
        <div class="modal-actions ${isEditing ? "split" : ""}">
          ${isEditing ? '<button class="btn danger" type="button" id="delete-project">削除</button>' : ""}
          <div class="modal-actions">
            <button class="btn" type="button" data-close-modal>キャンセル</button>
            <button class="btn primary" type="submit">保存</button>
          </div>
        </div>
      </form>
    </div>
  `);

  document.getElementById("project-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      clientId: data.clientId,
      title: String(data.title || "").trim(),
      dueDate: data.dueDate,
      status: data.status,
      amount: toNumber(data.amount),
      note: String(data.note || "").trim(),
    };

    if (isEditing) {
      const index = state.projects.findIndex((item) => item.id === projectId);
      state.projects[index] = { ...state.projects[index], ...payload };
      showToast("案件を更新しました");
    } else {
      state.projects.unshift({ id: createId("p"), ...payload });
      showToast("案件を追加しました");
    }
    saveState();
    closeModal();
    render();
  });

  const deleteButton = document.getElementById("delete-project");
  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      if (!confirm("この案件を削除しますか？")) return;
      state.projects = state.projects.filter((item) => item.id !== projectId);
      saveState();
      closeModal();
      render();
      showToast("案件を削除しました");
    });
  }
}

function openClientModal(selectedId = state.clients[0]?.id || "") {
  const selected = getClient(selectedId);
  openModal(`
    <div class="modal wide">
      ${modalHeader("クライアント管理")}
      <div class="modal-body client-manager">
        <div class="client-list">
          ${state.clients.map((client) => `
            <button class="client-tab ${client.id === selected.id ? "active" : ""}" type="button" data-client-id="${client.id}">
              <strong>${escapeHtml(client.name)}</strong>
              <span>${escapeHtml(client.email || "メール未設定")}</span>
            </button>
          `).join("")}
          <button class="btn full" type="button" id="new-client-button">
            <i data-lucide="plus"></i>
            <span>追加</span>
          </button>
        </div>
        <form id="client-form">
          <input type="hidden" name="id" value="${escapeAttr(selected.id)}" />
          <div class="form-grid">
            <div class="field full">
              <label for="client-name">会社名・屋号</label>
              <input id="client-name" name="name" value="${escapeAttr(selected.name)}" required />
            </div>
            <div class="field">
              <label for="client-short">短縮名</label>
              <input id="client-short" name="shortName" value="${escapeAttr(selected.shortName || "")}" />
            </div>
            <div class="field">
              <label for="client-contact">担当者</label>
              <input id="client-contact" name="contact" value="${escapeAttr(selected.contact || "")}" />
            </div>
            <div class="field">
              <label for="client-postal">郵便番号</label>
              <input id="client-postal" name="postal" value="${escapeAttr(selected.postal || "")}" />
            </div>
            <div class="field">
              <label for="client-email">メール</label>
              <input id="client-email" name="email" type="email" value="${escapeAttr(selected.email || "")}" />
            </div>
            <div class="field full">
              <label for="client-address">住所</label>
              <input id="client-address" name="address" value="${escapeAttr(selected.address || "")}" />
            </div>
            <div class="field full">
              <label for="client-registration">登録番号</label>
              <input id="client-registration" name="registration" value="${escapeAttr(selected.registration || "")}" />
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn" type="button" data-close-modal>閉じる</button>
            <button class="btn primary" type="submit">保存</button>
          </div>
        </form>
      </div>
    </div>
  `, "wide");

  modalRoot.querySelectorAll(".client-tab").forEach((button) => {
    button.addEventListener("click", () => openClientModal(button.dataset.clientId));
  });

  document.getElementById("new-client-button").addEventListener("click", () => {
    const id = createId("client");
    state.clients.push({
      id,
      name: "新規クライアント",
      shortName: "",
      postal: "",
      address: "",
      contact: "",
      email: "",
      registration: "",
    });
    saveState();
    openClientModal(id);
  });

  document.getElementById("client-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const index = state.clients.findIndex((client) => client.id === data.id);
    state.clients[index] = {
      ...state.clients[index],
      id: data.id,
      name: String(data.name || "").trim(),
      shortName: String(data.shortName || "").trim(),
      postal: String(data.postal || "").trim(),
      address: String(data.address || "").trim(),
      contact: String(data.contact || "").trim(),
      email: String(data.email || "").trim(),
      registration: String(data.registration || "").trim(),
    };
    saveState();
    render();
    openClientModal(data.id);
    showToast("クライアントを保存しました");
  });

  refreshIcons();
}

function openItemPresetModal(selectedId = state.itemPresets[0]?.id || "new") {
  const isNew = selectedId === "new";
  const selected = state.itemPresets.find((item) => item.id === selectedId) || {
    id: "",
    name: "",
    unit: "式",
    unitPrice: "",
    description: "",
  };

  openModal(`
    <div class="modal wide">
      ${modalHeader("品目管理")}
      <div class="modal-body client-manager">
        <div class="client-list">
          ${state.itemPresets.map((item) => `
            <button class="client-tab ${item.id === selected.id ? "active" : ""}" type="button" data-item-id="${item.id}">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${formatCurrency(item.unitPrice)} / ${escapeHtml(item.unit || "式")}</span>
            </button>
          `).join("")}
          <button class="btn full" type="button" id="new-item-button">
            <i data-lucide="plus"></i>
            <span>追加</span>
          </button>
        </div>
        <form id="item-preset-form">
          <input type="hidden" name="id" value="${escapeAttr(selected.id)}" />
          <div class="form-grid">
            <div class="field full">
              <label for="item-name">品目名</label>
              <input id="item-name" name="name" value="${escapeAttr(selected.name)}" placeholder="例: 動画編集" required />
            </div>
            <div class="field">
              <label for="item-unit">単位</label>
              <input id="item-unit" name="unit" value="${escapeAttr(selected.unit)}" placeholder="例: 式" required />
            </div>
            <div class="field">
              <label for="item-price">単価（円）</label>
              <input id="item-price" name="unitPrice" inputmode="numeric" value="${escapeAttr(selected.unitPrice)}" placeholder="例: 25000" required />
            </div>
            <div class="field full">
              <label for="item-description">摘要</label>
              <textarea id="item-description" name="description">${escapeHtml(selected.description || "")}</textarea>
            </div>
          </div>
          <div class="modal-actions ${isNew ? "" : "split"}">
            ${isNew ? "" : '<button class="btn danger" type="button" id="delete-item-preset">削除</button>'}
            <div class="modal-actions">
              <button class="btn" type="button" data-close-modal>閉じる</button>
              <button class="btn primary" type="submit">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `);

  modalRoot.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => openItemPresetModal(button.dataset.itemId));
  });

  document.getElementById("new-item-button").addEventListener("click", () => openItemPresetModal("new"));

  document.getElementById("item-preset-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      name: String(data.name || "").trim(),
      unit: String(data.unit || "式").trim(),
      unitPrice: toNumber(data.unitPrice),
      description: String(data.description || "").trim(),
    };
    let savedId = data.id;

    if (data.id) {
      const index = state.itemPresets.findIndex((item) => item.id === data.id);
      state.itemPresets[index] = { ...state.itemPresets[index], ...payload };
    } else {
      savedId = createId("item");
      state.itemPresets.push({ id: savedId, ...payload });
    }

    saveState();
    openItemPresetModal(savedId);
    showToast("品目を保存しました");
  });

  const deleteButton = document.getElementById("delete-item-preset");
  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      if (!confirm("この品目を削除しますか？")) return;
      state.itemPresets = state.itemPresets.filter((item) => item.id !== selected.id);
      saveState();
      openItemPresetModal(state.itemPresets[0]?.id || "new");
      showToast("品目を削除しました");
    });
  }

  refreshIcons();
}

function openExpenseModal(selectedExpenseId = "") {
  const expenses = getMonthExpenses(state.selectedMonth).sort((a, b) => a.date.localeCompare(b.date));
  const editing = state.expenses.find((expense) => expense.id === selectedExpenseId);
  const expense = editing || {
    date: `${state.selectedMonth}-01`,
    category: EXPENSE_CATEGORIES[0],
    title: "",
    vendor: "",
    amount: "",
    memo: "",
  };
  const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  openModal(`
    <div class="modal wide">
      ${modalHeader("経費管理")}
      <div class="modal-body expense-layout">
        <section>
          <div class="expense-total">
            <span>${formatMonthLabel(state.selectedMonth)} 経費</span>
            <strong>${formatCurrency(total)}</strong>
          </div>
          <div class="expense-list">
            ${expenses.length ? expenses.map((item) => `
              <div class="expense-row ${item.id === selectedExpenseId ? "active" : ""}">
                <div class="expense-date">${formatShortDate(item.date)}</div>
                <div class="expense-main">
                  <strong>${escapeHtml(item.title)}</strong>
                  <span>${escapeHtml(item.category)} / ${escapeHtml(item.vendor || "支払先未設定")}</span>
                </div>
                <div class="expense-amount">${formatCurrency(item.amount)}</div>
                <button class="icon-button" type="button" aria-label="編集" data-edit-expense="${item.id}">
                  <i data-lucide="pencil"></i>
                </button>
                <button class="icon-button" type="button" aria-label="削除" data-delete-expense="${item.id}">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            `).join("") : '<div class="empty-column">経費なし</div>'}
          </div>
        </section>
        <form class="expense-form-panel" id="expense-form">
          <input type="hidden" name="id" value="${escapeAttr(editing?.id || "")}" />
          <div class="form-grid">
            <div class="field">
              <label for="expense-date">日付</label>
              <input id="expense-date" name="date" type="date" value="${escapeAttr(expense.date)}" required />
            </div>
            <div class="field">
              <label for="expense-category">カテゴリ</label>
              <select id="expense-category" name="category">
                ${EXPENSE_CATEGORIES.map((category) => option(category, category, expense.category)).join("")}
              </select>
            </div>
            <div class="field full">
              <label for="expense-title">内容</label>
              <input id="expense-title" name="title" value="${escapeAttr(expense.title)}" placeholder="例: BGMライセンス" required />
            </div>
            <div class="field full">
              <label for="expense-vendor">支払先</label>
              <input id="expense-vendor" name="vendor" value="${escapeAttr(expense.vendor || "")}" placeholder="例: Audio Market" />
            </div>
            <div class="field full">
              <label for="expense-amount">金額（円）</label>
              <input id="expense-amount" name="amount" inputmode="numeric" value="${escapeAttr(expense.amount)}" placeholder="例: 3300" required />
            </div>
            <div class="field full">
              <label for="expense-memo">メモ</label>
              <textarea id="expense-memo" name="memo">${escapeHtml(expense.memo || "")}</textarea>
            </div>
          </div>
          <div class="modal-actions split">
            <button class="btn" type="button" id="new-expense-entry">新規</button>
            <div class="modal-actions">
              <button class="btn" type="button" data-close-modal>閉じる</button>
              <button class="btn primary" type="submit">${editing ? "更新" : "追加"}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `);

  modalRoot.querySelectorAll("[data-edit-expense]").forEach((button) => {
    button.addEventListener("click", () => openExpenseModal(button.dataset.editExpense));
  });

  modalRoot.querySelectorAll("[data-delete-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      state.expenses = state.expenses.filter((item) => item.id !== button.dataset.deleteExpense);
      saveState();
      render();
      openExpenseModal();
      showToast("経費を削除しました");
    });
  });

  document.getElementById("new-expense-entry").addEventListener("click", () => openExpenseModal());

  document.getElementById("expense-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      date: data.date,
      category: data.category,
      title: String(data.title || "").trim(),
      vendor: String(data.vendor || "").trim(),
      amount: toNumber(data.amount),
      memo: String(data.memo || "").trim(),
    };

    if (data.id) {
      const index = state.expenses.findIndex((item) => item.id === data.id);
      state.expenses[index] = { ...state.expenses[index], ...payload };
      showToast("経費を更新しました");
    } else {
      state.expenses.unshift({ id: createId("e"), ...payload });
      showToast("経費を追加しました");
    }

    state.selectedMonth = payload.date.slice(0, 7) || state.selectedMonth;
    saveState();
    render();
    openExpenseModal(data.id || "");
  });

  refreshIcons();
}

function openSettingsModal(selectedId = state.issuerProfiles[0]?.id || "new") {
  const isNew = selectedId === "new";
  const issuer = state.issuerProfiles.find((profile) => profile.id === selectedId) || {
    id: "",
    name: "",
    postal: "",
    address: "",
    phone: "",
    registration: "",
    bankName: "",
    bankCode: "",
    bankBranch: "",
    branchCode: "",
    bankType: "普通預金",
    bankNumber: "",
    bankHolder: "",
  };

  openModal(`
    <div class="modal wide">
      ${modalHeader("発行元プロフィール")}
      <div class="modal-body client-manager">
        <div class="client-list">
          ${state.issuerProfiles.map((profile) => `
            <button class="client-tab ${profile.id === issuer.id ? "active" : ""}" type="button" data-issuer-id="${profile.id}">
              <strong>${escapeHtml(profile.name)}</strong>
              <span>${escapeHtml(profile.bankName || "振込先未設定")}</span>
            </button>
          `).join("")}
          <button class="btn full" type="button" id="new-issuer-button">
            <i data-lucide="plus"></i>
            <span>追加</span>
          </button>
        </div>
        <form id="issuer-form">
          <input type="hidden" name="id" value="${escapeAttr(issuer.id)}" />
          <div class="form-grid">
            <div class="field full">
              <label for="issuer-name">発行元名</label>
              <input id="issuer-name" name="name" value="${escapeAttr(issuer.name)}" required />
            </div>
            <div class="field">
              <label for="issuer-postal">郵便番号</label>
              <input id="issuer-postal" name="postal" value="${escapeAttr(issuer.postal)}" />
            </div>
            <div class="field">
              <label for="issuer-phone">電話番号</label>
              <input id="issuer-phone" name="phone" value="${escapeAttr(issuer.phone)}" />
            </div>
            <div class="field full">
              <label for="issuer-address">住所</label>
              <input id="issuer-address" name="address" value="${escapeAttr(issuer.address)}" />
            </div>
            <div class="field full">
              <label for="issuer-reg">登録番号</label>
              <input id="issuer-reg" name="registration" value="${escapeAttr(issuer.registration)}" />
            </div>
            <div class="field">
              <label for="bank-name">銀行名</label>
              <input id="bank-name" name="bankName" value="${escapeAttr(issuer.bankName)}" />
            </div>
            <div class="field">
              <label for="bank-code">金融機関コード</label>
              <input id="bank-code" name="bankCode" value="${escapeAttr(issuer.bankCode)}" />
            </div>
            <div class="field">
              <label for="bank-branch">支店名</label>
              <input id="bank-branch" name="bankBranch" value="${escapeAttr(issuer.bankBranch)}" />
            </div>
            <div class="field">
              <label for="branch-code">支店コード</label>
              <input id="branch-code" name="branchCode" value="${escapeAttr(issuer.branchCode)}" />
            </div>
            <div class="field">
              <label for="bank-type">種別</label>
              <input id="bank-type" name="bankType" value="${escapeAttr(issuer.bankType)}" />
            </div>
            <div class="field">
              <label for="bank-number">口座番号</label>
              <input id="bank-number" name="bankNumber" value="${escapeAttr(issuer.bankNumber)}" />
            </div>
            <div class="field full">
              <label for="bank-holder">口座名義</label>
              <input id="bank-holder" name="bankHolder" value="${escapeAttr(issuer.bankHolder)}" />
            </div>
          </div>
          <div class="modal-actions ${isNew ? "" : "split"}">
            ${isNew ? "" : '<button class="btn danger" type="button" id="delete-issuer">削除</button>'}
            <div class="modal-actions">
              <button class="btn" type="button" data-close-modal>閉じる</button>
              <button class="btn primary" type="submit">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `);

  modalRoot.querySelectorAll("[data-issuer-id]").forEach((button) => {
    button.addEventListener("click", () => openSettingsModal(button.dataset.issuerId));
  });

  document.getElementById("new-issuer-button").addEventListener("click", () => openSettingsModal("new"));

  document.getElementById("issuer-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      name: String(data.name || "").trim(),
      postal: String(data.postal || "").trim(),
      address: String(data.address || "").trim(),
      phone: String(data.phone || "").trim(),
      registration: String(data.registration || "").trim(),
      bankName: String(data.bankName || "").trim(),
      bankCode: String(data.bankCode || "").trim(),
      bankBranch: String(data.bankBranch || "").trim(),
      branchCode: String(data.branchCode || "").trim(),
      bankType: String(data.bankType || "").trim(),
      bankNumber: String(data.bankNumber || "").trim(),
      bankHolder: String(data.bankHolder || "").trim(),
    };
    let savedId = data.id;

    if (data.id) {
      const index = state.issuerProfiles.findIndex((profile) => profile.id === data.id);
      state.issuerProfiles[index] = { ...state.issuerProfiles[index], ...payload };
    } else {
      savedId = createId("issuer");
      state.issuerProfiles.push({ id: savedId, ...payload });
    }

    saveState();
    openSettingsModal(savedId);
    showToast("発行元を保存しました");
  });

  const deleteButton = document.getElementById("delete-issuer");
  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      if (!confirm("この発行元プロフィールを削除しますか？")) return;
      state.issuerProfiles = state.issuerProfiles.filter((profile) => profile.id !== issuer.id);
      saveState();
      openSettingsModal(state.issuerProfiles[0]?.id || "new");
      showToast("発行元を削除しました");
    });
  }

  refreshIcons();
}

function openInvoiceModal() {
  const defaultClient = state.clients.find((client) => client.id === "client-kitakore") || state.clients[0];
  const defaultIssuer = state.issuerProfiles.find((issuer) => issuer.id === "issuer-hasegawa") || state.issuerProfiles[0];
  const initialDefaults = getClientInvoiceDefaults(defaultClient, state.selectedMonth);
  const initialItemPreset = state.itemPresets.find((item) => item.id === initialDefaults.itemPresetId) || state.itemPresets[0];
  const draft = {
    targetMonth: state.selectedMonth,
    clientId: defaultClient?.id || "",
    issuerId: defaultIssuer?.id || "",
    issueDate: getTodayInputValue(),
    dueDate: initialDefaults.dueDate,
    taxMode: "none",
    withholdingMode: initialDefaults.withholdingMode,
    templateId: initialDefaults.templateId,
    discountRate: initialDefaults.discountRate,
    invoiceNo: `${state.selectedMonth.replace("-", "")}-01`,
    manualItems: [],
  };

  openModal(`
    <div class="modal wide">
      ${modalHeader("請求書の作成")}
      <div class="modal-body">
        <div class="invoice-controls">
          <div class="field full">
            <label for="invoice-preset">保存済み請求データ</label>
            <div class="invoice-template-input">
              <select id="invoice-preset">
                <option value="">請求データを選択</option>
                ${state.invoicePresets.map((preset) => option(preset.id, preset.name, "")).join("")}
              </select>
              <button class="btn" type="button" id="load-invoice-preset">読み込む</button>
            </div>
            <small class="field-note">6月分の件数・単価・特例支払期限をまとめて呼び出します。</small>
          </div>
          <div class="field full">
            <label for="invoice-template-url">共有スプレッドシートURL</label>
            <div class="invoice-template-input">
              <input id="invoice-template-url" type="url" value="${escapeAttr(getInvoiceTemplate(draft.templateId).sourceUrl || "")}" placeholder="https://docs.google.com/spreadsheets/d/..." />
              <button class="btn" type="button" id="load-invoice-template">雛形を読み込む</button>
            </div>
            <small class="field-note">共有URLから登録済みの請求書フォーマットを呼び出します。</small>
          </div>
          <div class="field full">
            <label for="invoice-template">請求書フォーマット</label>
            <select id="invoice-template" data-invoice-field="templateId">
              ${state.invoiceTemplates.map((template) => option(template.id, template.name, draft.templateId)).join("")}
            </select>
          </div>
          <div class="field">
            <label for="invoice-month">対象月（納期がこの月＋納品済み案件を集計）</label>
            <input id="invoice-month" data-invoice-field="targetMonth" type="month" value="${draft.targetMonth}" />
          </div>
          <div class="field">
            <label for="invoice-client">クライアント</label>
            <select id="invoice-client" data-invoice-field="clientId">
              ${state.clients.map((client) => option(client.id, client.name, draft.clientId)).join("")}
            </select>
          </div>
          <div class="field">
            <label for="invoice-issuer">発行元</label>
            <select id="invoice-issuer" data-invoice-field="issuerId">
              ${state.issuerProfiles.map((issuer) => option(issuer.id, issuer.name, draft.issuerId)).join("")}
            </select>
          </div>
          <div class="field">
            <label for="invoice-issue">発行日</label>
            <input id="invoice-issue" data-invoice-field="issueDate" type="date" value="${draft.issueDate}" />
          </div>
          <div class="field">
            <label for="invoice-due">支払期限</label>
            <input id="invoice-due" data-invoice-field="dueDate" type="date" value="${draft.dueDate}" />
          </div>
          <div class="field">
            <label for="invoice-tax">税区分</label>
            <select id="invoice-tax" data-invoice-field="taxMode">
              <option value="none" selected>消費税なし</option>
              <option value="external">外税（単価は税抜・消費税10%を加算）</option>
              <option value="internal">内税（単価は税込・税額を内訳表示）</option>
            </select>
          </div>
          <div class="field">
            <label for="invoice-withholding">源泉徴収</label>
              <select id="invoice-withholding" data-invoice-field="withholdingMode">
              <option value="enabled" ${draft.withholdingMode === "enabled" ? "selected" : ""}>あり（10.21%）</option>
              <option value="none" ${draft.withholdingMode === "none" ? "selected" : ""}>なし</option>
            </select>
          </div>
          <div class="field">
            <label for="invoice-discount">値引率（%）</label>
            <input id="invoice-discount" data-invoice-field="discountRate" type="number" min="0" max="100" step="0.01" value="${draft.discountRate}" />
          </div>
          <div class="field">
            <label for="invoice-no">請求書番号</label>
            <input id="invoice-no" data-invoice-field="invoiceNo" value="${draft.invoiceNo}" />
          </div>
          <div class="field full invoice-item-builder">
            <label for="invoice-item-preset">保存品目を追加</label>
            <div class="invoice-item-add">
              <select id="invoice-item-preset">
                ${state.itemPresets.map((item) => option(item.id, `${item.name} / ${formatCurrency(item.unitPrice)}`, initialDefaults.itemPresetId)).join("")}
              </select>
              <input id="invoice-item-quantity" type="number" min="1" step="1" value="1" aria-label="数量" />
              <input id="invoice-item-unit-price" type="number" min="0" step="1" value="${Number(initialItemPreset?.unitPrice || 0)}" aria-label="単価" />
              <button class="btn" type="button" id="add-invoice-item">
                <i data-lucide="plus"></i>
                <span>追加</span>
              </button>
            </div>
            <div class="invoice-manual-items" id="invoice-manual-items"></div>
          </div>
        </div>
        <div class="invoice-preview-wrap">
          <div id="invoice-preview"></div>
        </div>
        <div class="modal-actions">
          <span class="pdf-filename-hint" id="pdf-filename-hint"></span>
          <button class="btn" type="button" data-close-modal>閉じる</button>
          <button class="btn" type="button" id="export-spreadsheet-invoice" hidden>
            <i data-lucide="file-spreadsheet"></i>
            <span>Excel雛形に出力</span>
          </button>
          <button class="btn primary" type="button" id="print-invoice">
            <i data-lucide="printer"></i>
            <span>印刷 / PDF保存</span>
          </button>
        </div>
      </div>
    </div>
  `);

  const previewEl = document.getElementById("invoice-preview");
  const pdfFilenameHintEl = document.getElementById("pdf-filename-hint");
  const spreadsheetExportButton = document.getElementById("export-spreadsheet-invoice");
  const updatePreview = () => {
    previewEl.innerHTML = renderInvoicePaper(draft);
    pdfFilenameHintEl.textContent = `PDF名：${getInvoicePdfFilename(draft)}`;
    spreadsheetExportButton.hidden = !getInvoiceTemplate(draft.templateId).localTemplatePath;
  };
  const renderManualItems = () => {
    const container = document.getElementById("invoice-manual-items");
    container.innerHTML = draft.manualItems.map((item) => `
      <div class="invoice-manual-item">
        <span>${escapeHtml(item.name)}</span>
        <strong>${item.quantity}${escapeHtml(item.unit)} / ${formatCurrency(item.unitPrice * item.quantity)}</strong>
        <button class="icon-button" type="button" aria-label="品目を外す" data-remove-invoice-item="${item.id}">
          <i data-lucide="x"></i>
        </button>
      </div>
    `).join("");
    container.querySelectorAll("[data-remove-invoice-item]").forEach((button) => {
      button.addEventListener("click", () => {
        draft.manualItems = draft.manualItems.filter((item) => item.id !== button.dataset.removeInvoiceItem);
        renderManualItems();
        updatePreview();
      });
    });
    refreshIcons();
  };

  document.getElementById("load-invoice-preset").addEventListener("click", () => {
    const presetId = document.getElementById("invoice-preset").value;
    const preset = state.invoicePresets.find((item) => item.id === presetId);
    if (!preset) {
      showToast("請求データを選択してください");
      return;
    }

    Object.assign(draft, {
      targetMonth: preset.targetMonth,
      clientId: preset.clientId,
      issuerId: preset.issuerId,
      issueDate: preset.issueDate,
      dueDate: preset.dueDate,
      taxMode: preset.taxMode,
      withholdingMode: preset.withholdingMode,
      templateId: preset.templateId,
      discountRate: preset.discountRate,
      invoiceNo: preset.invoiceNo,
      manualItems: structuredClone(preset.manualItems),
    });

    const fields = {
      "invoice-month": draft.targetMonth,
      "invoice-client": draft.clientId,
      "invoice-issuer": draft.issuerId,
      "invoice-issue": draft.issueDate,
      "invoice-due": draft.dueDate,
      "invoice-tax": draft.taxMode,
      "invoice-withholding": draft.withholdingMode,
      "invoice-discount": draft.discountRate,
      "invoice-no": draft.invoiceNo,
      "invoice-template": draft.templateId,
    };
    Object.entries(fields).forEach(([id, value]) => {
      document.getElementById(id).value = value;
    });
    document.getElementById("invoice-template-url").value = getInvoiceTemplate(draft.templateId).sourceUrl || "";
    document.getElementById("invoice-item-preset").value = preset.itemPresetId;
    const itemPreset = state.itemPresets.find((item) => item.id === preset.itemPresetId);
    document.getElementById("invoice-item-unit-price").value = Number(itemPreset?.unitPrice || 0);

    renderManualItems();
    updatePreview();
    showToast(`${preset.name}を読み込みました`);
  });

  modalRoot.querySelectorAll("[data-invoice-field]").forEach((field) => {
    const syncField = () => {
      const fieldName = field.dataset.invoiceField;
      draft[fieldName] = fieldName === "discountRate" ? toNumber(field.value) : field.value;
      if (fieldName === "clientId" || fieldName === "targetMonth") {
        const defaults = getClientInvoiceDefaults(getClient(draft.clientId), draft.targetMonth);
        draft.dueDate = defaults.dueDate;
        draft.withholdingMode = defaults.withholdingMode;
        draft.discountRate = defaults.discountRate;
        document.getElementById("invoice-due").value = draft.dueDate;
        document.getElementById("invoice-withholding").value = draft.withholdingMode;
        document.getElementById("invoice-discount").value = draft.discountRate;
        draft.templateId = defaults.templateId;
        document.getElementById("invoice-template").value = draft.templateId;
        document.getElementById("invoice-template-url").value = getInvoiceTemplate(draft.templateId).sourceUrl || "";
        if (defaults.itemPresetId) {
          document.getElementById("invoice-item-preset").value = defaults.itemPresetId;
          const preset = state.itemPresets.find((item) => item.id === defaults.itemPresetId);
          document.getElementById("invoice-item-unit-price").value = Number(preset?.unitPrice || 0);
        }
      }
      if (fieldName === "templateId") {
        document.getElementById("invoice-template-url").value = getInvoiceTemplate(draft.templateId).sourceUrl || "";
      }
      updatePreview();
    };
    field.addEventListener("input", () => {
      syncField();
    });
    field.addEventListener("change", () => {
      syncField();
    });
  });

  document.getElementById("invoice-item-preset").addEventListener("change", (event) => {
    const preset = state.itemPresets.find((item) => item.id === event.target.value);
    document.getElementById("invoice-item-unit-price").value = Number(preset?.unitPrice || 0);
  });

  document.getElementById("load-invoice-template").addEventListener("click", () => {
    const sourceUrl = document.getElementById("invoice-template-url").value.trim();
    const spreadsheetId = extractSpreadsheetId(sourceUrl);
    const template = state.invoiceTemplates.find((item) => item.spreadsheetId === spreadsheetId);
    if (!template) {
      showToast("この共有シートは未登録です。雛形の追加が必要です");
      return;
    }
    draft.templateId = template.id;
    document.getElementById("invoice-template").value = template.id;
    updatePreview();
    showToast(`${template.name}を読み込みました`);
  });

  document.getElementById("add-invoice-item").addEventListener("click", () => {
    const presetId = document.getElementById("invoice-item-preset").value;
    const preset = state.itemPresets.find((item) => item.id === presetId);
    const quantity = Math.max(1, toNumber(document.getElementById("invoice-item-quantity").value));
    const unitPrice = Math.max(0, toNumber(document.getElementById("invoice-item-unit-price").value));
    if (!preset) return;
    draft.manualItems.push({
      id: createId("line"),
      presetId: preset.id,
      name: preset.name,
      unit: preset.unit || "式",
      unitPrice,
      quantity,
      description: preset.description || "",
    });
    renderManualItems();
    updatePreview();
  });

  document.getElementById("print-invoice").addEventListener("click", () => printInvoice(draft));
  spreadsheetExportButton.addEventListener("click", async () => {
    spreadsheetExportButton.disabled = true;
    try {
      await exportSpreadsheetInvoice(draft);
      showToast("入力済みExcelを出力しました");
    } catch (error) {
      console.error(error);
      showToast("Excel出力に失敗しました");
    } finally {
      spreadsheetExportButton.disabled = false;
    }
  });
  renderManualItems();
  updatePreview();
  refreshIcons();
}

function renderInvoicePaper(draft) {
  const client = getClient(draft.clientId);
  const issuer = getIssuer(draft.issuerId);
  const items = getInvoiceLineItems(draft);
  const { subtotal, discountRate, discount, discountedSubtotal, tax, withholding, total } = calculateInvoiceTotals(draft, items);
  const template = getInvoiceTemplate(draft.templateId);

  if (template.type === "suzukiSpreadsheet") {
    return renderSuzukiSpreadsheetInvoice({
      draft,
      client,
      issuer,
      items,
      subtotal,
      discount,
      tax,
      withholding,
      total,
    });
  }

  const itemRows = items.length
    ? items.map((item) => `
      <tr>
        <td>${escapeHtml(item.name)}${item.description ? `<br /><small>${escapeHtml(item.description)}</small>` : ""}</td>
        <td>${item.quantity}${escapeHtml(item.unit || "式")}</td>
        <td>${formatCurrency(item.unitPrice)}</td>
        <td>${formatCurrency(item.unitPrice * item.quantity)}</td>
      </tr>
    `).join("")
    : `
      <tr>
        <td colspan="4" style="text-align:center;">品目がありません</td>
      </tr>
    `;

  return `
    <article class="invoice-paper">
      <h2 class="invoice-title">請 求 書</h2>
      <div class="invoice-head">
        <section>
          <div class="recipient-address">〒${escapeHtml(client.postal || "")}<br />${escapeHtml(client.address || "")}</div>
          <p class="recipient">${escapeHtml(client.name)}${client.contact ? `<br />${escapeHtml(client.contact)}` : ""}　御中</p>
          <p class="invoice-message">下記のとおりご請求申し上げます。</p>
          <div class="total-box">
            <span>ご請求金額</span>
            <span>${formatCurrency(total)}${draft.taxMode === "none" ? "" : "（税込）"}</span>
          </div>
          <p class="due-line">お支払期限： ${formatLongDate(draft.dueDate)}</p>
        </section>
        <section class="invoice-meta">
          <div>請求書番号： ${escapeHtml(draft.invoiceNo)}</div>
          <div>発行日： ${formatLongDate(draft.issueDate)}</div>
          <div class="issuer-block">
            <strong>${escapeHtml(issuer.name)}</strong><br />
            〒${escapeHtml(issuer.postal || "")}<br />
            ${escapeHtml(issuer.address || "")}<br />
            ${issuer.phone ? `TEL：${escapeHtml(issuer.phone)}<br />` : ""}
            ${issuer.registration ? `登録番号：${escapeHtml(issuer.registration)}` : ""}
          </div>
        </section>
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>品目・摘要</th>
            <th>数量</th>
            <th>単価</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div class="totals">
        <div class="totals-row"><span>小計</span><span>${formatCurrency(subtotal)}</span></div>
        ${discount > 0 ? `<div class="totals-row"><span>値引（-${discountRate}%）</span><span>-${formatCurrency(discount)}</span></div>` : ""}
        ${discount > 0 ? `<div class="totals-row"><span>値引後小計</span><span>${formatCurrency(discountedSubtotal)}</span></div>` : ""}
        ${draft.taxMode === "external" ? `<div class="totals-row"><span>消費税（10%）</span><span>${formatCurrency(tax)}</span></div>` : ""}
        ${draft.taxMode === "internal" ? `<div class="totals-row"><span>うち消費税（10%）</span><span>${formatCurrency(tax)}</span></div>` : ""}
        ${withholding > 0 ? `<div class="totals-row"><span>源泉徴収</span><span>-${formatCurrency(withholding)}</span></div>` : ""}
        <div class="totals-row"><strong>合計</strong><strong>${formatCurrency(total)}</strong></div>
      </div>

      <div class="invoice-notes">
        振込先
        ${escapeHtml(issuer.bankName)}${issuer.bankCode ? `（金融機関コード：${escapeHtml(issuer.bankCode)}）` : ""}
        ${escapeHtml(issuer.bankBranch)}${issuer.branchCode ? `（支店コード：${escapeHtml(issuer.branchCode)}）` : ""}
        ${escapeHtml(issuer.bankType)}　口座番号：${escapeHtml(issuer.bankNumber)}
        口座名義：${escapeHtml(issuer.bankHolder)}
        ${withholding > 0 ? "\n※源泉徴収額は、消費税を除く報酬額に対して算出しています。" : ""}
      </div>
    </article>
  `;
}

function renderSuzukiSpreadsheetInvoice({ draft, client, issuer, items, discount, tax, withholding, total }) {
  const recipientName = getRecipientNameWithHonorific(client.contact || client.name);
  const adjustmentItems = [
    discount > 0 ? { name: `値引（-${draft.discountRate}%）`, quantity: 1, unit: "式", unitPrice: -discount } : null,
    draft.taxMode === "external" && tax > 0 ? { name: "消費税（10%）", quantity: 1, unit: "式", unitPrice: tax } : null,
    withholding > 0 ? { name: "源泉徴収", quantity: 1, unit: "式", unitPrice: -withholding } : null,
  ].filter(Boolean);
  const sheetItems = [...items, ...adjustmentItems];
  const rowCount = Math.max(23, sheetItems.length);
  const itemRows = Array.from({ length: rowCount }, (_, index) => {
    const item = sheetItems[index];
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${item ? escapeHtml(item.name) : ""}</td>
        <td>${item ? item.quantity : ""}</td>
        <td>${item ? escapeHtml(item.unit || "式") : ""}</td>
        <td>${item ? formatCurrency(item.unitPrice) : ""}</td>
        <td>${item ? formatCurrency(item.unitPrice * item.quantity) : ""}</td>
        <td>${item?.description ? escapeHtml(item.description) : ""}</td>
      </tr>
    `;
  }).join("");

  return `
    <article class="invoice-paper spreadsheet-invoice-paper">
      <h2 class="invoice-title spreadsheet-invoice-title">請　求　書</h2>

      <div class="spreadsheet-invoice-top">
        <section class="spreadsheet-recipient-block">
          <p class="spreadsheet-recipient-company">${escapeHtml(client.name)}</p>
          <p class="spreadsheet-recipient-name">${escapeHtml(recipientName)}御中</p>
        </section>
        <section class="spreadsheet-issue-block">
          <div><span>発行日</span><strong>${formatLongDate(draft.issueDate)}</strong></div>
          <div><span>登録番号</span><strong>${escapeHtml(issuer.registration || "-")}</strong></div>
          <div><span>氏名：</span><strong>${escapeHtml(issuer.name)}</strong></div>
          <div><span>郵便番号：</span><strong>${escapeHtml(issuer.postal || "")}</strong></div>
          <div><span>住所：</span><strong>${escapeHtml(issuer.address || "")}</strong></div>
          <div><span>TEL：</span><strong>${escapeHtml(issuer.phone || "")}</strong></div>
        </section>
      </div>

      <p class="spreadsheet-invoice-message">下記のとおり御請求申し上げます。</p>

      <div class="spreadsheet-billing-summary">
        <div class="spreadsheet-total-claim">
          <span>ご請求金額</span>
          <strong>${formatCurrency(total)}</strong>
          <span>（税込）</span>
        </div>
        <div class="spreadsheet-due-date">
          <span>お支払期限</span>
          <strong>${formatLongDate(draft.dueDate)}</strong>
        </div>
      </div>

      <table class="invoice-table spreadsheet-invoice-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>品　　　　名</th>
            <th>数量</th>
            <th>単位</th>
            <th>単価</th>
            <th>金　　額</th>
            <th>摘要</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div class="spreadsheet-invoice-footer">
        <section class="spreadsheet-bank-block">
          <strong>[振込先]</strong>
          <div>${escapeHtml(issuer.bankName || "")}　${escapeHtml(issuer.bankBranch || "")}</div>
          <div>${escapeHtml(issuer.bankType || "普通")}　口座番号 ${escapeHtml(issuer.bankNumber || "")}</div>
          <div>名義　${escapeHtml(issuer.bankHolder || "")}</div>
        </section>
        <section class="spreadsheet-grand-total">
          <span>合　　計</span>
          <strong>${formatCurrency(total)}</strong>
        </section>
      </div>
    </article>
  `;
}

function openModal(content) {
  modalRoot.innerHTML = `<div class="modal-backdrop">${content}</div>`;
  modalRoot.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });
  modalRoot.querySelector(".modal-backdrop").addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) closeModal();
  });
  document.addEventListener("keydown", closeOnEscape);
  refreshIcons();
}

function closeModal() {
  modalRoot.innerHTML = "";
  document.removeEventListener("keydown", closeOnEscape);
}

function closeOnEscape(event) {
  if (event.key === "Escape") closeModal();
}

function modalHeader(title) {
  return `
    <header class="modal-header">
      <h2 class="modal-title">${escapeHtml(title)}</h2>
      <button class="icon-button" type="button" aria-label="閉じる" data-close-modal>
        <i data-lucide="x"></i>
      </button>
    </header>
  `;
}

function getSelectedMonthProjects() {
  return state.projects.filter((project) => getProjectMonth(project) === state.selectedMonth);
}

function getProjectMonth(project) {
  return String(project.dueDate || "").slice(0, 7);
}

function getMonthRevenue(month) {
  return state.projects
    .filter((project) => project.status === "delivered" && getProjectMonth(project) === month)
    .reduce((sum, project) => sum + Number(project.amount || 0), 0);
}

function getMonthExpenses(month) {
  return (state.expenses || []).filter((expense) => String(expense.date || "").startsWith(month));
}

function shiftSelectedMonth(delta) {
  state.selectedMonth = shiftMonth(state.selectedMonth, delta);
  saveState();
  render();
}

function shiftMonth(month, delta) {
  const [year, monthNumber] = month.split("-").map(Number);
  const date = new Date(year, monthNumber - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getClientInvoiceDefaults(client, month) {
  return {
    dueDate: getClientPaymentDueDate(month, client?.defaultDueRule),
    withholdingMode: client?.defaultWithholdingMode === "none" ? "none" : "enabled",
    itemPresetId: client?.defaultItemPresetId || state.itemPresets[0]?.id || "",
    templateId: client?.defaultInvoiceTemplateId || "template-standard",
    discountRate: Number(client?.defaultDiscountRate || 0),
  };
}

function getInvoiceTemplate(templateId) {
  return state.invoiceTemplates.find((template) => template.id === templateId) || state.invoiceTemplates[0] || {
    id: "template-standard",
    name: "標準フォーマット",
    type: "standard",
    sourceUrl: "",
  };
}

function extractSpreadsheetId(value) {
  const match = String(value || "").match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match?.[1] || "";
}

function getClientPaymentDueDate(month, dueRule = "nextMonthEnd") {
  const [year, monthNumber] = month.split("-").map(Number);
  if (dueRule === "currentMonth20") {
    return formatDateInput(new Date(year, monthNumber - 1, 20));
  }
  if (dueRule === "currentMonthEnd") {
    return formatDateInput(new Date(year, monthNumber, 0));
  }
  const lastDayOfNextMonth = new Date(year, monthNumber + 1, 0);
  return formatDateInput(lastDayOfNextMonth);
}

function getInvoicePdfFilename(draft) {
  const [year, month] = String(draft.targetMonth || "").split("-");
  const issuerName = getIssuer(draft.issuerId).name || "発行元未設定";
  const safeIssuerName = issuerName.replace(/[\\/:*?"<>|]/g, "_");
  return `${year}年${Number(month)}月請求分_${safeIssuerName}.pdf`;
}

function printInvoice(draft) {
  const originalTitle = document.title;
  document.title = getInvoicePdfFilename(draft).replace(/\.pdf$/i, "");
  window.addEventListener("afterprint", () => {
    document.title = originalTitle;
  }, { once: true });
  window.print();
}

async function exportSpreadsheetInvoice(draft) {
  const template = getInvoiceTemplate(draft.templateId);
  if (!template.localTemplatePath) throw new Error("Spreadsheet template is not available");
  if (!window.ExcelJS) throw new Error("ExcelJS is not available");

  const response = await fetch(template.localTemplatePath);
  if (!response.ok) throw new Error(`Template download failed: ${response.status}`);

  const workbook = new window.ExcelJS.Workbook();
  await workbook.xlsx.load(await response.arrayBuffer());
  const worksheet = workbook.worksheets.find((sheet) => sheet.name.startsWith("【コピー用】請求書"));
  if (!worksheet) throw new Error("Invoice template sheet is missing");

  const client = getClient(draft.clientId);
  const issuer = getIssuer(draft.issuerId);
  const items = getInvoiceLineItems(draft);
  const totals = calculateInvoiceTotals(draft, items);

  worksheet.getCell("B3").value = [client.name, getRecipientNameWithHonorific(client.contact)].filter(Boolean).join("　");
  worksheet.getCell("F3").value = "御中";
  worksheet.getCell("J3").value = new Date(`${draft.issueDate}T12:00:00`);
  worksheet.getCell("J4").value = issuer.registration || "-";
  worksheet.getCell("H6").value = `氏名：${issuer.name || ""}`;
  worksheet.getCell("H7").value = `郵便番号：${issuer.postal || ""}`;
  worksheet.getCell("H8").value = `住所：${issuer.address || ""}`;
  worksheet.getCell("H8").font = { ...worksheet.getCell("H8").font, size: 8 };
  worksheet.getCell("H10").value = `TEL：${issuer.phone || ""}`;
  worksheet.getCell("D10").value = totals.total;
  worksheet.getCell("D10").numFmt = '"¥"#,##0';
  worksheet.getCell("D12").value = new Date(`${draft.dueDate}T12:00:00`);

  for (let row = 15; row <= 37; row += 1) {
    worksheet.getCell(`B${row}`).value = row - 14;
    worksheet.getCell(`C${row}`).value = null;
    worksheet.getCell(`E${row}`).value = null;
    worksheet.getCell(`F${row}`).value = null;
    worksheet.getCell(`G${row}`).value = null;
    worksheet.getCell(`H${row}`).value = null;
    worksheet.getCell(`I${row}`).value = null;
    worksheet.getCell(`J${row}`).value = null;
    worksheet.getCell(`H${row}`).numFmt = "#,##0;-#,##0;;";
    worksheet.getCell(`I${row}`).numFmt = "#,##0;-#,##0;;";
  }

  items.slice(0, 23).forEach((item, index) => {
    const row = index + 15;
    worksheet.getCell(`C${row}`).value = item.name;
    worksheet.getCell(`E${row}`).value = Number(item.quantity || 0);
    worksheet.getCell(`F${row}`).value = item.unit || "式";
    worksheet.getCell(`G${row}`).value = Number(item.unitPrice || 0);
    worksheet.getCell(`H${row}`).value = Number(item.unitPrice || 0) * Number(item.quantity || 0);
    worksheet.getCell(`J${row}`).value = item.description || "";
  });

  worksheet.getCell("B39").value = "[振込先]";
  worksheet.getCell("B40").value = "銀行名";
  worksheet.getCell("C40").value = `${issuer.bankName || ""} ${issuer.bankBranch || ""}`.trim();
  worksheet.getCell("B41").value = "口座番号";
  worksheet.getCell("C41").value = `${issuer.bankType || "普通"} ${issuer.bankNumber || ""}`.trim();
  worksheet.getCell("B42").value = "名義";
  worksheet.getCell("C42").value = issuer.bankHolder || "";
  worksheet.getCell("H39").value = totals.total;
  worksheet.pageSetup.printArea = "B1:J45";
  worksheet.pageSetup.orientation = "portrait";
  worksheet.pageSetup.fitToPage = true;
  worksheet.pageSetup.fitToWidth = 1;
  worksheet.pageSetup.fitToHeight = 1;
  workbook.calcProperties.fullCalcOnLoad = true;

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = getInvoicePdfFilename(draft).replace(/\.pdf$/i, ".xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
}

function getInvoiceLineItems(draft) {
  const projectItems = state.projects
    .filter((project) => (
      project.status === "delivered" &&
      project.clientId === draft.clientId &&
      project.dueDate.startsWith(draft.targetMonth)
    ))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .map((project) => ({
      id: project.id,
      name: project.title,
      unit: "式",
      unitPrice: Number(project.amount || 0),
      quantity: 1,
      description: "",
    }));
  return [...projectItems, ...draft.manualItems];
}

function calculateInvoiceTotals(draft, items) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0);
  const discountRate = Math.min(100, Math.max(0, Number(draft.discountRate || 0)));
  const discount = Math.floor(subtotal * (discountRate / 100));
  const discountedSubtotal = subtotal - discount;
  const tax = draft.taxMode === "external" ? Math.round(discountedSubtotal * 0.1) : draft.taxMode === "internal" ? Math.round(discountedSubtotal / 11) : 0;
  const withholding = draft.withholdingMode === "enabled" ? calculateWithholding(discountedSubtotal) : 0;
  const totalBeforeWithholding = draft.taxMode === "external" ? discountedSubtotal + tax : discountedSubtotal;
  return {
    subtotal,
    discountRate,
    discount,
    discountedSubtotal,
    tax,
    withholding,
    total: totalBeforeWithholding - withholding,
  };
}

function getTodayInputValue() {
  return formatDateInput(new Date());
}

function getCurrentMonthInput() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMonthLabel(value) {
  const [year, month] = value.split("-");
  return `${year}年${Number(month)}月`;
}

function mergeById(defaultItems, savedItems) {
  if (!Array.isArray(savedItems)) return structuredClone(defaultItems);
  const savedById = new Map(savedItems.map((item) => [item.id, item]));
  const mergedDefaults = defaultItems.map((item) => ({ ...item, ...(savedById.get(item.id) || {}) }));
  const customItems = savedItems.filter((item) => !defaultItems.some((defaultItem) => defaultItem.id === item.id));
  return [...mergedDefaults, ...customItems];
}

function calculateWithholding(amount) {
  const taxableAmount = Math.max(0, Math.floor(Number(amount || 0)));
  if (taxableAmount <= 1000000) return Math.floor(taxableAmount * 0.1021);
  return 102100 + Math.floor((taxableAmount - 1000000) * 0.2042);
}

function getClient(clientId) {
  return state.clients.find((client) => client.id === clientId) || state.clients[0] || { id: "", name: "未設定" };
}

function getRecipientNameWithHonorific(value) {
  const name = String(value || "").trim();
  if (!name) return "";
  return name.endsWith("様") ? name : `${name}様`;
}

function getIssuer(issuerId) {
  return state.issuerProfiles.find((issuer) => issuer.id === issuerId) || state.issuerProfiles[0] || {
    id: "",
    name: "未設定",
    postal: "",
    address: "",
    phone: "",
    registration: "",
    bankName: "",
    bankCode: "",
    bankBranch: "",
    branchCode: "",
    bankType: "",
    bankNumber: "",
    bankHolder: "",
  };
}

function option(value, label, selected) {
  return `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatShortDate(value) {
  if (!value) return "未設定";
  const date = new Date(`${value}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatLongDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function isDueSoon(value) {
  if (!value) return false;
  const today = new Date("2026-06-14T00:00:00");
  const due = new Date(`${value}T00:00:00`);
  const diff = (due - today) / 86400000;
  return diff >= 0 && diff <= 4;
}

function toNumber(value) {
  return Number(String(value || "").replace(/[^\d.-]/g, "")) || 0;
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 2,
      },
    });
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add("show");
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}
