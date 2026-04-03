// Dynamic dropdowns and prediction
document.addEventListener('DOMContentLoaded', function() {
    const companySelect = document.getElementById('company');
    const modelSelect = document.getElementById('name');
    const fuelSelect = document.getElementById('fuel_type');
    const form = document.getElementById('predictForm');
    const resultDiv = document.getElementById('result');
    const priceEl = document.getElementById('priceResult');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const predictAgainBtn = document.getElementById('predictAgain');

    // Load initial data
    loadCompanies();
    loadFuelTypes();

    // Company change handler
    companySelect.addEventListener('change', function() {
        const company = this.value;
        modelSelect.innerHTML = '<option value="">Select Model...</option>';
        modelSelect.disabled = !company;
        if (company) loadModels(company);
    });

    // Form submit
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!validateForm()) return;

        showLoading(true);
        hideError();

        try {
            const data = getFormData();
            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                showResult(result.predicted_price, result.currency);
            } else {
                showError(result.error || 'Prediction failed');
            }
        } catch (err) {
            showError('Network error: ' + err.message);
        } finally {
            showLoading(false);
        }
    });

    // Predict again
    predictAgainBtn.addEventListener('click', function() {
        resultDiv.style.display = 'none';
        form.reset();
        modelSelect.disabled = true;
        loadCompanies();  // Reload companies
    });

    async function loadCompanies() {
        try {
            const res = await fetch('/companies');
            const companies = await res.json();
            companies.forEach(co => {
                const opt = document.createElement('option');
                opt.value = opt.textContent = co;
                companySelect.appendChild(opt);
            });
        } catch (err) {
            console.error('Failed to load companies:', err);
        }
    }

    async function loadFuelTypes() {
        try {
            const res = await fetch('/fuel_types');
            const fuels = await res.json();
            fuels.forEach(fuel => {
                const opt = document.createElement('option');
                opt.value = opt.textContent = fuel;
                fuelSelect.appendChild(opt);
            });
        } catch (err) {
            console.error('Failed to load fuel types:', err);
        }
    }

    async function loadModels(company) {
        try {
            const res = await fetch(`/models/${company}`);
            const models = await res.json();
            models.forEach(model => {
                const opt = document.createElement('option');
                opt.value = opt.textContent = model;
                modelSelect.appendChild(opt);
            });
        } catch (err) {
            console.error('Failed to load models:', err);
        }
    }

    function validateForm() {
        const year = parseInt(document.getElementById('year').value);
        const kms = parseInt(document.getElementById('kms_driven').value);
        if (year < 2000 || year > 2024 || kms < 0) {
            showError('Year: 2000-2024, KMs >= 0');
            return false;
        }
        return true;
    }

    function getFormData() {
        return {
            name: modelSelect.value,
            company: companySelect.value,
            year: parseInt(document.getElementById('year').value),
            kms_driven: parseInt(document.getElementById('kms_driven').value),
            fuel_type: fuelSelect.value
        };
    }

    function showResult(price, currency) {
        priceEl.textContent = `${currency} ${price.toLocaleString()}`;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
        errorEl.scrollIntoView({ behavior: 'smooth' });
    }

    function hideError() {
        errorEl.style.display = 'none';
    }

    function showLoading(show) {
        loadingEl.style.display = show ? 'block' : 'none';
        if (show) loadingEl.scrollIntoView({ behavior: 'smooth' });
    }
});
