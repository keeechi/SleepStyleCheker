let checkStatus = {};

function generateRow(item, index, sheetName) {
    const fieldCells = fields.map(f => {
        const found = item.conditions.find(c => c.field === f);
        return `<td>${found ? convertRank(found.minRank) : ""}</td>`;
    }).join("");

    const isChecked = checkStatus[index] || false;
    return `<tr>
        <td><input type="checkbox" id="gotcha_${index}_${sheetName}" ${isChecked ? "checked" : ""}></td>
        <td>${item.no}</td>
        <td>${item.type}</td>
        <td>${"★".repeat(item.rarity)}${"☆".repeat(5 - item.rarity)}</td>
        <td>${item.name}</td>
        ${fieldCells}
    </tr>`;
}

window.onload = () => {
    const tbodyMain = document.getElementById("table-body-main");
    const tbodyWakakusa = document.getElementById("table-body-wakakusa");

    sleepFaces.forEach((item, index) => {
        tbodyMain.insertAdjacentHTML("beforeend", generateRow(item, index, "main"));

        if (item.conditions.some(c => c.field === "ワカクサ本島")) {
            tbodyWakakusa.insertAdjacentHTML("beforeend", generateRow(item, index, "wakakusa"));
        }
    });

    setCheckboxEvents();
};

function setCheckboxEvents() {
    sleepFaces.forEach((item, index) => {
        const mainCheckbox = document.getElementById(`gotcha_${index}_main`);
        const wakakusaCheckbox = document.getElementById(`gotcha_${index}_wakakusa`);

        if (mainCheckbox) {
            mainCheckbox.addEventListener('change', () => {
                checkStatus[index] = mainCheckbox.checked;
                syncCheckboxes(index);
            });
        }

        if (wakakusaCheckbox) {
            wakakusaCheckbox.addEventListener('change', () => {
                checkStatus[index] = wakakusaCheckbox.checked;
                syncCheckboxes(index);
            });
        }
    });
}

function syncCheckboxes(index) {
    const isChecked = checkStatus[index];
    const mainCheckbox = document.getElementById(`gotcha_${index}_main`);
    const wakakusaCheckbox = document.getElementById(`gotcha_${index}_wakakusa`);

    if (mainCheckbox) mainCheckbox.checked = isChecked;
    if (wakakusaCheckbox) wakakusaCheckbox.checked = isChecked;
}

// カビゴンランク数値 → ランク名変換用
const rankMap = {
    1: 'ノーマル1', 2: 'ノーマル2', 3: 'ノーマル3', 4: 'ノーマル4', 5: 'ノーマル5',
    6: 'スーパー1', 7: 'スーパー2', 8: 'スーパー3', 9: 'スーパー4', 10: 'スーパー5',
    11: 'ハイパー1', 12: 'ハイパー2', 13: 'ハイパー3', 14: 'ハイパー4', 15: 'ハイパー5',
    16: 'マスター1', 17: 'マスター2', 18: 'マスター3', 19: 'マスター4', 20: 'マスター5',
    21: 'マスター6', 22: 'マスター7', 23: 'マスター8', 24: 'マスター9', 25: 'マスター10',
    26: 'マスター11', 27: 'マスター12', 28: 'マスター13', 29: 'マスター14', 30: 'マスター15',
    31: 'マスター16', 32: 'マスター17', 33: 'マスター18', 34: 'マスター19', 35: 'マスター20'
};

// データベース
const sleepFaces = [
    {
        id: 1,
        number: "0001",
        type: "うとうと",
        rarity: 1,
        name: "フシギダネ",
        conditions: [
            { field: "ワカクサ本島", minRank: 6 },
            { field: "ラピスラズリ湖畔", minRank: 1 }
        ]
    },
    {
        id: 2,
        number: "0181",
        type: "すやすや",
        rarity: 3,
        name: "デンリュウ",
        conditions: [
            { field: "ウノハナ雪原", minRank: 22 },
            { field: "ゴールド旧発電所", minRank: 20 }
        ]
    },
    {
        id: 3,
        number: "0303",
        type: "ぐっすり",
        rarity: 4,
        name: "クチート",
        conditions: [
            { field: "ワカクサ本島", minRank: 23 },
            { field: "トープ洞窟", minRank: 19 },
            { field: "ゴールド旧発電所", minRank: 16 }
        ]
    },
    {
        id: 4,
        number: "0491",
        type: "うとうと",
        rarity: 3,
        name: "ダークライ",
        conditions: [
            { field: "ワカクサ本島", minRank: 1 },
            { field: "シアンの砂浜", minRank: 1 },
            { field: "トープ洞窟", minRank: 1 },
            { field: "ウノハナ雪原", minRank: 1 },
            { field: "ラピスラズリ湖畔", minRank: 1 },
            { field: "ゴールド旧発電所", minRank: 1 }
        ]
    }
];

// チェック状態保存用（今後ローカルストレージ対応も可能）
let checkStatus = {};

// 表を生成
window.onload = () => {
    generateMainTable();
};

// 星表示用
function getRarityStars(rarity) {
    return '★'.repeat(rarity) + '☆'.repeat(5 - rarity);
}

// メインテーブル生成
function generateMainTable() {
    const tbody = document.getElementById('main-table-body');
    tbody.innerHTML = '';

    sleepFaces.forEach((face, index) => {
        const tr = document.createElement('tr');

        // チェックボックス
        const tdCheck = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `gotcha_${index}`;
        checkbox.checked = checkStatus[index] || false;

        // チェックボックスの状態を記録
        checkbox.addEventListener('change', () => {
            checkStatus[index] = checkbox.checked;
            // 他シートとの連動処理は次のSTEPで実装
        });

        tdCheck.appendChild(checkbox);
        tr.appendChild(tdCheck);

        // No.
        const tdNo = document.createElement('td');
        tdNo.textContent = face.number;
        tr.appendChild(tdNo);

        // Type
        const tdType = document.createElement('td');
        tdType.textContent = face.type;
        tr.appendChild(tdType);

        // Rarity
        const tdRarity = document.createElement('td');
        tdRarity.textContent = getRarityStars(face.rarity);
        tr.appendChild(tdRarity);

        // Name
        const tdName = document.createElement('td');
        tdName.textContent = face.name;
        tr.appendChild(tdName);

        // フィールドカラムを作成
        const fields = ["ワカクサ本島", "シアンの砂浜", "トープ洞窟", "ウノハナ雪原", "ラピスラズリ湖畔", "ゴールド旧発電所"];
        fields.forEach(field => {
            const tdField = document.createElement('td');
            const condition = face.conditions.find(c => c.field === field);
            tdField.textContent = condition ? rankMap[condition.minRank] : '';
            tr.appendChild(tdField);
        });

        tbody.appendChild(tr);
    });
}
