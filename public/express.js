document.addEventListener('alpine:init', () => {
    Alpine.data('priceplansWidget', () => {
        return {
            plan: '',
            usage: '',
            new_plan_name: '',
            new_sms_price: '',
            new_call_price: '',
            selectedName: "",
            actions: "",
            total: "",
            pricePlans: [],
            updatePlanName: '',
            updateSMSPrice: '',
            updateCallPrice: '',
            deletePlanName: '',
            myPlans: [],
            showTable: false,
            showFirstSection: false,

            init() {
                this.fetchPricePlans();
            },

           async fetchPricePlans() {
               await axios.get('http://localhost:4011/api/price_plan')
                    .then((result) => {
                        console.log(result.data);
                        
                        this.pricePlans = result.data.price_plans;
                    })
                    .catch((err) => {
                        console.error("Cannot Get /api/price_plan", err);
                    });
            },

            phoneBill() {
                if (!this.selectedName || !this.actions) {
                    alert("Please enter both plan name and actions.");
                    return;
                }

                axios.post('http://localhost:4011/api/phonebill', {
                    price_plan: this.selectedName,
                    actions: this.actions
                })
                    .then(result => {
                        this.total = result.data.total || 'error calculating total';
                    })
                    .catch(error => {
                        this.total = 'error calculating total';
                        console.error(error);
                    });

                // Clear inputs after 3 seconds
                setTimeout(() => {
                    this.selectedName = '';
                    this.actions = '';
                    this.total = '';
                }, 3000);
            },

           async createPlan() {
               await axios.post("http://localhost:4011/api/price_plan/create", {
                    plan_name: this.new_plan_name.toLowerCase(),
                    sms_price: parseFloat(this.new_sms_price).toFixed(2),
                    call_price: parseFloat(this.new_call_price).toFixed(2)
                })
                    .then(result => {
                        console.log(result.data);
                        
                        if (result.data.error) {
                            alert(result.data.error);
                        } else {
                            alert(result.data.status);
                            this.fetchPricePlans();  // Refresh the list of plans
                            this.new_plan_name = '';
                            this.new_sms_price = '';
                            this.new_call_price = '';
                        }
                    });
            },

           async updatePlan() {
               await axios.post("/api/price_plan_update", {
                    plan_name: this.updatePlanName.toLowerCase(),
                    sms_price: parseFloat(this.updateSMSPrice).toFixed(2),
                    call_price: parseFloat(this.updateCallPrice).toFixed(2)
                })
                    .then(result => {
                        if (result.data.status) {
                            alert(result.data.status);
                            this.fetchPricePlans();  // Refresh the list of plans
                            this.updatePlanName = '';
                            this.updateSMSPrice = '';
                            this.updateCallPrice = '';
                        } else {
                            alert(result.data.error);
                        }
                    });
            },

           async deletePlan() {
               await axios.post("/api/price_plan/delete", {
                    plan_name: this.deletePlanName.toLowerCase()
                })
                    .then(result => {
                        if (result.data.status) {
                            alert(result.data.status);
                            this.fetchPricePlans();  // Refresh the list of plans
                            this.deletePlanName = '';
                        } else {
                            alert(result.data.error);
                        }
                    });
            }
        }
    })
})