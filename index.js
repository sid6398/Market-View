dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024']

strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
            '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
        }
    },


    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread',], '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
            '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
        }
    },

    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'],
            '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread - Strategy', 'Long Straddle'],
            '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
            '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
        }
    }
]

// const dateDropdown = document.getElementById("dateDropdown");
// dateDropdown.innerHTML = dateArray.map(date => `<option value="${date}">${date}</option>`).join('');

const dateDropdownDetails = document.getElementById("dateDropdownDetails");
const selectedDateSummary = document.getElementById("selectedDateSummary");
const dateList = document.getElementById("dateList");

const defaultDate = dateArray[0];
selectedDateSummary.textContent = defaultDate;

dateList.innerHTML = dateArray.map(date =>
    `<li class="dropdown-item" onclick="selectDate('${date}')">${date}</li>`
).join("");

function selectDate(date) {
    selectedDateSummary.textContent = date;
    dateDropdownDetails.removeAttribute("open");
    renderStrategies();
}


document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        renderStrategies();
    });
});

function renderStrategies() {
    const selectedDate = selectedDateSummary.textContent;;
    const selectedView = document.querySelector(".toggle-btn.active").textContent.trim(); 
    const cardsContainer = document.getElementById("cardsContainer");
    const emptyState = document.getElementById("emptyState");


    const viewData = strategyArray.find(strategy => strategy.View === selectedView)?.Value[selectedDate] || [];

    cardsContainer.innerHTML = "";
    emptyState.style.display = "none";

    if (viewData.length === 0) {
        emptyState.textContent = `There are no strategies for ${selectedDate}`;
        emptyState.style.display = "block";
        return;
    }

    const strategyCount = new Map();
    viewData.forEach(strategy =>
        strategyCount.set(strategy, (strategyCount.get(strategy) || 0) + 1)
    );

    strategyCount.forEach((count, name) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<strong>${name}</strong><span>&#8226; ${count} ${count > 1 ? "Strategies" : "Strategy"}</span>`;
        cardsContainer.appendChild(card);
    });

}

// dateDropdown.addEventListener("change", renderStrategies);

window.onload = function () {
    renderStrategies();
};
