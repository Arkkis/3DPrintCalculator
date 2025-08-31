// 3D Tulostimen Sähkökustannuslaskuri
class PrinterCalculator {
  constructor() {
    this.printerPresets = {
      "anycubic-kobra-3-v2": {
        name: "Anycubic Kobra 3 V2",
        powerUsage: 200,
        description: "Keskimääräinen tehonkulutus 200W",
      },
      "prusa-mk4": {
        name: "Prusa MK4",
        powerUsage: 180,
        description: "Keskimääräinen tehonkulutus 180W",
      },
      "ender-3-v3-se": {
        name: "Creality Ender 3 V3 SE",
        powerUsage: 220,
        description: "Keskimääräinen tehonkulutus 220W",
      },
      "bambu-lab-p1p": {
        name: "Bambu Lab P1P",
        powerUsage: 250,
        description: "Keskimääräinen tehonkulutus 250W",
      },
      "ultimaker-s5": {
        name: "Ultimaker S5",
        powerUsage: 300,
        description: "Keskimääräinen tehonkulutus 300W",
      },
      custom: {
        name: "Mukautettu tulostin",
        powerUsage: 200,
        description: "Syötä oma tehonkulutus",
      },
    };

    this.filamentEntries = [];
    this.filamentCounter = 0;

    this.initializeElements();
    this.bindEvents();
    this.setupInteractiveFeatures();
    this.loadSavedValues();
    this.calculate();
  }

  initializeElements() {
    this.printerSelect = document.getElementById("printer-select");
    this.electricityPrice = document.getElementById("electricity-price");
    this.printTime = document.getElementById("print-time");
    this.powerUsage = document.getElementById("power-usage");

    // Filament elements
    this.filamentList = document.getElementById("filament-list");
    this.addFilamentBtn = document.getElementById("add-filament-btn");
    this.totalFilamentWeight = document.getElementById("total-filament-weight");
    this.totalFilamentCost = document.getElementById("total-filament-cost");

    // Additional cost elements
    this.failedPrints = document.getElementById("failed-prints");
    this.maintenanceCost = document.getElementById("maintenance-cost");
    this.laborCost = document.getElementById("labor-cost");

    // Settings elements
    this.clearMemoryBtn = document.getElementById("clear-memory-btn");

    // Results elements
    this.energyConsumption = document.getElementById("energy-consumption");
    this.electricityCost = document.getElementById("electricity-cost");
    this.filamentCost = document.getElementById("filament-cost");
    this.additionalCosts = document.getElementById("additional-costs");
    this.failedPrintsCost = document.getElementById("failed-prints-cost");
    this.maintenanceCosts = document.getElementById("maintenance-costs");
    this.laborCosts = document.getElementById("labor-costs");
    this.totalCost = document.getElementById("total-cost");
    this.avgPower = document.getElementById("avg-power");
    this.costPerHour = document.getElementById("cost-per-hour");
  }

  bindEvents() {
    // Add event listeners for real-time calculation
    this.printerSelect.addEventListener("change", () => this.onPrinterChange());
    this.electricityPrice.addEventListener("input", () => {
      this.saveValues();
      this.calculate();
    });
    this.printTime.addEventListener("input", () => {
      this.saveValues();
      this.calculate();
    });
    this.powerUsage.addEventListener("input", () => {
      this.saveValues();
      this.calculate();
    });

    // Additional cost events
    this.failedPrints.addEventListener("input", () => {
      this.saveValues();
      this.calculate();
    });
    this.maintenanceCost.addEventListener("input", () => {
      this.saveValues();
      this.calculate();
    });
    this.laborCost.addEventListener("input", () => {
      this.saveValues();
      this.calculate();
    });

    // Filament events
    this.addFilamentBtn.addEventListener("click", () =>
      this.addFilamentEntry()
    );

    // Settings events
    this.clearMemoryBtn.addEventListener("click", () => this.clearMemory());

    // Add input validation
    this.addInputValidation();
  }

  addInputValidation() {
    const inputs = [
      this.electricityPrice,
      this.printTime,
      this.powerUsage,
      this.failedPrints,
      this.maintenanceCost,
      this.laborCost,
    ];

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        const value = parseFloat(input.value);
        if (value < 0) {
          input.value = 0;
          this.saveValues();
          this.calculate();
        }
        // Validate percentage inputs
        if (input === this.failedPrints) {
          if (value > 100) {
            input.value = 100;
            this.saveValues();
            this.calculate();
          }
        }
      });
    });
  }

  setupInteractiveFeatures() {
    // Setup toggle for additional costs
    const toggleCheckbox = document.getElementById("enable-additional-costs");
    const additionalCostsContent = document.getElementById(
      "additional-costs-content"
    );

    if (toggleCheckbox && additionalCostsContent) {
      toggleCheckbox.addEventListener("change", () => {
        if (toggleCheckbox.checked) {
          additionalCostsContent.style.display = "block";
          setTimeout(() => {
            additionalCostsContent.style.opacity = "1";
          }, 10);
        } else {
          additionalCostsContent.style.opacity = "0";
          setTimeout(() => {
            additionalCostsContent.style.display = "none";
          }, 300);
          // Reset values when disabled
          this.failedPrints.value = "0";
          this.maintenanceCost.value = "0";
          this.laborCost.value = "0";
        }
        // Always save when toggle changes
        this.saveValues();
        this.calculate();
      });
    }

    // Setup range slider for failed prints
    const failedPrintsSlider = document.getElementById("failed-prints-slider");
    if (failedPrintsSlider) {
      failedPrintsSlider.addEventListener("input", () => {
        this.failedPrints.value = failedPrintsSlider.value;
        this.saveValues();
        this.calculate();
      });

      this.failedPrints.addEventListener("input", () => {
        failedPrintsSlider.value = this.failedPrints.value;
      });
    }

    // Setup example time buttons
    const exampleButtons = document.querySelectorAll(".btn-example");
    exampleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const time = button.getAttribute("data-time");
        this.printTime.value = time;
        this.saveValues();
        this.calculate();

        // Visual feedback
        button.style.background = "#48bb78";
        button.style.color = "white";
        setTimeout(() => {
          button.style.background = "";
          button.style.color = "";
        }, 200);
      });
    });

    // Update filament summary display
    this.updateFilamentSummaryDisplay();
  }

  updateFilamentSummaryDisplay() {
    const weightDisplay = document.getElementById(
      "total-filament-weight-display"
    );
    const costDisplay = document.getElementById("total-filament-cost-display");

    if (weightDisplay && costDisplay) {
      let totalWeight = 0;
      let totalCost = 0;

      this.filamentEntries.forEach((entry) => {
        totalWeight += entry.weight;
        totalCost += (entry.weight / 1000) * entry.pricePerKg;
      });

      weightDisplay.textContent = `${Math.round(totalWeight)} g`;
      costDisplay.textContent = this.formatCurrency(totalCost);
    }
  }

  // Save values to localStorage
  saveValues() {
    // Get toggle state
    const toggleCheckbox = document.getElementById("enable-additional-costs");
    const failedPrintsSlider = document.getElementById("failed-prints-slider");

    const valuesToSave = {
      electricityPrice: this.electricityPrice.value,
      printTime: this.printTime.value,
      powerUsage: this.powerUsage.value,
      selectedPrinter: this.printerSelect.value,
      failedPrints: this.failedPrints.value,
      failedPrintsSlider: failedPrintsSlider
        ? failedPrintsSlider.value
        : this.failedPrints.value,
      maintenanceCost: this.maintenanceCost.value,
      laborCost: this.laborCost.value,
      enableAdditionalCosts: toggleCheckbox ? toggleCheckbox.checked : true,
      filamentEntries: this.filamentEntries.map((entry) => ({
        weight: entry.weight,
        pricePerKg: entry.pricePerKg,
      })),
      lastSaved: new Date().toISOString(),
    };

    try {
      localStorage.setItem("printerCalculator", JSON.stringify(valuesToSave));
    } catch (error) {
      console.warn("Ei voitu tallentaa arvoja selaimen muistiin:", error);
    }
  }

  // Load saved values from localStorage
  loadSavedValues() {
    try {
      const saved = localStorage.getItem("printerCalculator");
      if (saved) {
        const values = JSON.parse(saved);

        // Load basic values
        if (values.electricityPrice) {
          this.electricityPrice.value = values.electricityPrice;
        }
        if (values.printTime) {
          this.printTime.value = values.printTime;
        }
        if (values.powerUsage) {
          this.powerUsage.value = values.powerUsage;
        }
        if (values.selectedPrinter) {
          this.printerSelect.value = values.selectedPrinter;
        }

        // Load additional cost values
        if (values.failedPrints) {
          this.failedPrints.value = values.failedPrints;
        }
        if (values.maintenanceCost) {
          this.maintenanceCost.value = values.maintenanceCost;
        }
        if (values.laborCost) {
          this.laborCost.value = values.laborCost;
        }

        // Load toggle state
        const toggleCheckbox = document.getElementById(
          "enable-additional-costs"
        );
        const additionalCostsContent = document.getElementById(
          "additional-costs-content"
        );
        if (
          toggleCheckbox &&
          typeof values.enableAdditionalCosts !== "undefined"
        ) {
          toggleCheckbox.checked = values.enableAdditionalCosts;
          if (additionalCostsContent) {
            if (values.enableAdditionalCosts) {
              additionalCostsContent.style.display = "block";
              additionalCostsContent.style.opacity = "1";
            } else {
              additionalCostsContent.style.display = "none";
              additionalCostsContent.style.opacity = "0";
            }
          }
        }

        // Load slider value
        const failedPrintsSlider = document.getElementById(
          "failed-prints-slider"
        );
        if (failedPrintsSlider && values.failedPrintsSlider) {
          failedPrintsSlider.value = values.failedPrintsSlider;
        }

        // Load filament entries
        if (values.filamentEntries && values.filamentEntries.length > 0) {
          values.filamentEntries.forEach((filament) => {
            this.addFilamentEntry(filament.weight, filament.pricePerKg);
          });
        } else {
          // Add default filament entry if none saved
          this.addFilamentEntry(150, 20);
        }

        // Show last saved info
        if (values.lastSaved) {
          this.showLastSavedInfo(values.lastSaved);
        }
      } else {
        // No saved values, add default filament entry
        this.addFilamentEntry(150, 20);
      }
    } catch (error) {
      console.warn("Ei voitu ladata tallennettuja arvoja:", error);
      // Add default filament entry on error
      this.addFilamentEntry(150, 20);
    }
  }

  // Show when values were last saved
  showLastSavedInfo(lastSaved) {
    const date = new Date(lastSaved);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    let timeText = "";
    if (diffInHours < 1) {
      timeText = "juuri äsken";
    } else if (diffInHours < 24) {
      timeText = `${diffInHours} tuntia sitten`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      timeText = `${diffInDays} päivää sitten`;
    }

    // Add a small indicator to show values are loaded
    const header = document.querySelector("header p");
    if (header) {
      header.innerHTML = `Laske 3D tulostimen sähkönkulutus ja kustannukset <small style="opacity: 0.7;">(Arvot ladattu ${timeText})</small>`;
    }
  }

  // Clear memory and reset to defaults
  clearMemory() {
    if (
      confirm(
        "Haluatko varmasti tyhjentää kaikki tallennetut arvot? Tätä ei voi perua."
      )
    ) {
      this.clearSavedValues();

      // Reset to default values
      this.electricityPrice.value = "0.08";
      this.printTime.value = "8";
      this.powerUsage.value = "200";
      this.printerSelect.value = "anycubic-kobra-3-v2";

      this.failedPrints.value = "5";
      this.maintenanceCost.value = "5";
      this.laborCost.value = "0";

      // Reset toggle and slider
      const toggleCheckbox = document.getElementById("enable-additional-costs");
      const additionalCostsContent = document.getElementById(
        "additional-costs-content"
      );
      const failedPrintsSlider = document.getElementById(
        "failed-prints-slider"
      );

      if (toggleCheckbox) {
        toggleCheckbox.checked = true;
      }
      if (additionalCostsContent) {
        additionalCostsContent.style.display = "block";
        additionalCostsContent.style.opacity = "1";
      }
      if (failedPrintsSlider) {
        failedPrintsSlider.value = "5";
      }

      // Clear filament entries
      this.filamentEntries.forEach((entry) => {
        if (entry.element) {
          entry.element.remove();
        }
      });
      this.filamentEntries = [];

      // Add default filament entry
      this.addFilamentEntry(150, 20);

      // Update header
      const header = document.querySelector("header p");
      if (header) {
        header.innerHTML = "Laske 3D tulostimen sähkönkulutus ja kustannukset";
      }

      // Show confirmation
      this.showNotification("Tallennetut arvot tyhjennetty!", "success");
    }
  }

  // Show notification
  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">×</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#48bb78" : "#4299e1"};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.remove();
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  onPrinterChange() {
    const selectedPrinter = this.printerSelect.value;
    const preset = this.printerPresets[selectedPrinter];

    if (preset && selectedPrinter !== "custom") {
      this.powerUsage.value = preset.powerUsage;
    }

    this.saveValues();
    this.calculate();
  }

  addFilamentEntry(weight = 0, pricePerKg = 20) {
    this.filamentCounter++;
    const entryId = `filament-${this.filamentCounter}`;

    const entry = {
      id: entryId,
      element: null,
      weight: weight,
      pricePerKg: pricePerKg,
    };

    const entryHtml = `
      <div class="filament-entry" id="${entryId}">
        <div class="filament-entry-header">
          <span class="filament-entry-title">Filamentti ${this.filamentCounter}</span>
          <button type="button" class="remove-filament-btn" onclick="printerCalculator.removeFilamentEntry('${entryId}')">
            🗑️
          </button>
        </div>
        <div class="filament-fields">
          <div class="form-group">
            <label for="${entryId}-weight">Määrä (g):</label>
            <input type="number" id="${entryId}-weight" class="form-control filament-weight" 
                   value="${weight}" step="1" min="0" placeholder="esim. 150">
          </div>
          <div class="form-group">
            <label for="${entryId}-price">Hinta (€/kg):</label>
            <input type="number" id="${entryId}-price" class="form-control filament-price" 
                   value="${pricePerKg}" step="0.1" min="0" placeholder="esim. 20">
          </div>
        </div>
      </div>
    `;

    this.filamentList.insertAdjacentHTML("beforeend", entryHtml);
    entry.element = document.getElementById(entryId);

    // Add event listeners for the new entry
    const weightInput = document.getElementById(`${entryId}-weight`);
    const priceInput = document.getElementById(`${entryId}-price`);

    weightInput.addEventListener("input", () => {
      entry.weight = parseFloat(weightInput.value) || 0;
      this.updateFilamentTotals();
      this.saveValues();
      this.calculate();
    });

    priceInput.addEventListener("input", () => {
      entry.pricePerKg = parseFloat(priceInput.value) || 0;
      this.updateFilamentTotals();
      this.saveValues();
      this.calculate();
    });

    this.filamentEntries.push(entry);
    this.updateFilamentTotals();
    this.saveValues();
    this.calculate();
  }

  removeFilamentEntry(entryId) {
    const entryIndex = this.filamentEntries.findIndex(
      (entry) => entry.id === entryId
    );
    if (entryIndex !== -1) {
      const entry = this.filamentEntries[entryIndex];
      entry.element.remove();
      this.filamentEntries.splice(entryIndex, 1);
      this.updateFilamentTotals();
      this.saveValues();
      this.calculate();
    }
  }

  updateFilamentTotals() {
    let totalWeight = 0;
    let totalCost = 0;

    this.filamentEntries.forEach((entry) => {
      totalWeight += entry.weight;
      totalCost += (entry.weight / 1000) * entry.pricePerKg; // Convert g to kg
    });

    this.totalFilamentWeight.value = Math.round(totalWeight);
    this.totalFilamentCost.value = this.formatCurrency(totalCost);

    // Update the visual summary display
    this.updateFilamentSummaryDisplay();
  }

  calculate() {
    // Get input values
    const electricityPrice = parseFloat(this.electricityPrice.value) || 0;
    const printTime = parseFloat(this.printTime.value) || 0;
    const powerUsage = parseFloat(this.powerUsage.value) || 0;

    // Calculate energy consumption (kWh)
    const energyConsumption = (powerUsage * printTime) / 1000;

    // Calculate electricity cost
    const electricityCost = energyConsumption * electricityPrice;

    // Calculate filament cost
    let filamentCost = 0;

    this.filamentEntries.forEach((entry) => {
      filamentCost += (entry.weight / 1000) * entry.pricePerKg;
    });

    // Calculate additional costs
    const additionalCostsBreakdown =
      this.calculateAdditionalCosts(filamentCost);
    const additionalCosts = additionalCostsBreakdown.total;

    // Calculate total cost
    const totalCost = electricityCost + filamentCost + additionalCosts;

    // Calculate cost per hour
    const costPerHour = printTime > 0 ? totalCost / printTime : 0;

    // Update display
    this.updateResults(
      energyConsumption,
      electricityCost,
      filamentCost,
      additionalCostsBreakdown,
      totalCost,
      powerUsage,
      costPerHour
    );
  }

  calculateAdditionalCosts(baseFilamentCost) {
    const failedPrints = parseFloat(this.failedPrints.value) || 0;
    const maintenanceCost = parseFloat(this.maintenanceCost.value) || 0;
    const laborCost = parseFloat(this.laborCost.value) || 0;
    const printTime = parseFloat(this.printTime.value) || 0;

    let failedPrintsCost = 0;
    let maintenanceCosts = 0;
    let laborCosts = laborCost; // Fixed cost per print

    // Failed prints cost
    if (failedPrints > 0) {
      const failedPercentage = failedPrints / 100;
      failedPrintsCost = baseFilamentCost * failedPercentage;
    }

    // Maintenance cost (prorated for print time)
    if (maintenanceCost > 0) {
      // Assume 160 hours per month (8h/day * 20 days)
      const monthlyHours = 160;
      const maintenancePerHour = maintenanceCost / monthlyHours;
      maintenanceCosts = maintenancePerHour * printTime;
    }

    return {
      failedPrintsCost,
      maintenanceCosts,
      laborCosts,
      total: failedPrintsCost + maintenanceCosts + laborCosts,
    };
  }

  getAverageFilamentPrice() {
    if (this.filamentEntries.length === 0) return 20; // Default price

    let totalPrice = 0;
    let totalWeight = 0;

    this.filamentEntries.forEach((entry) => {
      totalPrice += entry.weight * entry.pricePerKg;
      totalWeight += entry.weight;
    });

    return totalWeight > 0 ? totalPrice / totalWeight : 20;
  }

  updateResults(
    energyConsumption,
    electricityCost,
    filamentCost,
    additionalCostsBreakdown,
    totalCost,
    powerUsage,
    costPerHour
  ) {
    // Format numbers for display
    const formatNumber = (num, decimals = 2) => {
      return num.toFixed(decimals).replace(".", ",");
    };

    const formatCurrency = (amount) => {
      return `${formatNumber(amount, 2)} €`;
    };

    const formatEnergy = (amount) => {
      return `${formatNumber(amount, 3)} kWh`;
    };

    // Update basic cost elements
    this.energyConsumption.textContent = formatEnergy(energyConsumption);
    this.electricityCost.textContent = formatCurrency(electricityCost);
    this.filamentCost.textContent = formatCurrency(filamentCost);
    this.avgPower.textContent = `${Math.round(powerUsage)} W`;

    // Update additional costs breakdown
    this.failedPrintsCost.textContent = formatCurrency(
      additionalCostsBreakdown.failedPrintsCost
    );
    this.maintenanceCosts.textContent = formatCurrency(
      additionalCostsBreakdown.maintenanceCosts
    );
    this.laborCosts.textContent = formatCurrency(
      additionalCostsBreakdown.laborCosts
    );
    this.additionalCosts.textContent = formatCurrency(
      additionalCostsBreakdown.total
    );

    // Update totals
    this.totalCost.textContent = formatCurrency(totalCost);
    this.costPerHour.textContent = formatCurrency(costPerHour);

    // Results updated successfully
  }

  formatCurrency(amount) {
    return `${amount.toFixed(2).replace(".", ",")} €`;
  }

  // Utility method to get current calculation values
  getCurrentValues() {
    const toggleCheckbox = document.getElementById("enable-additional-costs");
    const failedPrintsSlider = document.getElementById("failed-prints-slider");

    return {
      electricityPrice: parseFloat(this.electricityPrice.value) || 0,
      printTime: parseFloat(this.printTime.value) || 0,
      powerUsage: parseFloat(this.powerUsage.value) || 0,
      selectedPrinter: this.printerSelect.value,
      failedPrints: parseFloat(this.failedPrints.value) || 5,
      failedPrintsSlider: failedPrintsSlider
        ? parseFloat(failedPrintsSlider.value)
        : parseFloat(this.failedPrints.value) || 5,
      maintenanceCost: parseFloat(this.maintenanceCost.value) || 5,
      laborCost: parseFloat(this.laborCost.value) || 0,
      enableAdditionalCosts: toggleCheckbox ? toggleCheckbox.checked : true,
      filamentEntries: this.filamentEntries.map((entry) => ({
        weight: entry.weight,
        pricePerKg: entry.pricePerKg,
      })),
    };
  }

  // Method to set values programmatically
  setValues(
    electricityPrice,
    printTime,
    powerUsage,
    printerType = "anycubic-kobra-3-v2",
    filamentData = [],
    additionalData = {}
  ) {
    this.electricityPrice.value = electricityPrice;
    this.printTime.value = printTime;
    this.powerUsage.value = powerUsage;
    this.printerSelect.value = printerType;

    // Set additional cost values
    if (additionalData.failedPrints) {
      this.failedPrints.value = additionalData.failedPrints;
    }
    if (additionalData.maintenanceCost) {
      this.maintenanceCost.value = additionalData.maintenanceCost;
    }
    if (additionalData.laborCost) {
      this.laborCost.value = additionalData.laborCost;
    }

    // Clear existing filament entries
    this.filamentEntries.forEach((entry) => {
      if (entry.element) {
        entry.element.remove();
      }
    });
    this.filamentEntries = [];

    // Add filament entries if provided
    filamentData.forEach((filament, index) => {
      this.addFilamentEntry(filament.weight || 0, filament.pricePerKg || 20);
    });

    this.updateFilamentTotals();
    this.saveValues();
    this.calculate();
  }

  // Method to clear saved values
  clearSavedValues() {
    try {
      localStorage.removeItem("printerCalculator");
      console.log("Tallennetut arvot tyhjennetty");
    } catch (error) {
      console.warn("Ei voitu tyhjentää tallennettuja arvoja:", error);
    }
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const calculator = new PrinterCalculator();

  // Make calculator available globally for debugging
  window.printerCalculator = calculator;
});
