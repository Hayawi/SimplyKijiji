app.service('DataService', function() {
  var selected = null;
  var repayment_plan = null;

  var select_data = function(loan_amount) {
    selected = loan_amount
  }

  var get_selected = function(){
    return selected;
  }

  var select_repayment = function(plan) {
    repayment_plan = plan;
  }

  var get_repayment = function() {
    return repayment_plan;
  }

  return {
    select_loan_amount: select_data,
    get_loan_amount: get_selected,
    select_plan: select_repayment,
    get_plan: get_repayment
  };

})
