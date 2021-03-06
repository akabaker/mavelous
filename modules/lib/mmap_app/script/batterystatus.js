
$(function(){
  window.Mavelous = window.Mavelous || {};

  Mavelous.BatteryButton = Backbone.View.extend({

    initialize: function () {
      var mavlink = this.options.mavlinkSrc;
      this.sysstatus = mavlink.subscribe('SYS_STATUS', this.onSysStatus, this);
      this.$el = this.options.el;
    },

    onSysStatus: function () {
      var stat = this.sysstatus;
      var remaining = stat.get('battery_remaining');
      var voltage = stat.get('voltage_battery');
      if (remaining < 30) {
        this.setButton('btn-warning', remaining.toFixed(0) + '%');
      } else if (remaining < 20) {
        this.setButton('btn-danger',
          remaining.toFixed(0) + '% ' + voltage.toFixed(1) + 'v');
      } else {
        this.setButton('btn-success', remaining.toFixed(0) + '%');
      }
    },

    setButton: function (c, text) {
      this.$el.removeClass('btn-success btn-warning btn-danger');
      this.$el.addClass(c);
      this.$el.html('Batt: ' + text);
    }
  });
});
