module('Controls');

test('should hide volume control if it\'s not supported', function(){
  expect(2);

  var player, volumeControl, noop, muteToggle;
  noop = function() {};
  player = {
    id: noop,
    on: noop,
    ready: noop,
    language: noop,
    languages: noop,
    tech: {
      'featuresVolumeControl': false
    },
    volume: function(){},
    muted: function(){},
    reportUserActivity: function(){}
  };

  volumeControl = new vjs.VolumeControl(player);
  muteToggle = new vjs.MuteToggle(player);

  ok(volumeControl.el().className.indexOf('vjs-hidden') >= 0, 'volumeControl is not hidden');
  ok(muteToggle.el().className.indexOf('vjs-hidden') >= 0, 'muteToggle is not hidden');
});

test('should test and toggle volume control on `loadstart`', function(){
  var listeners, player, volumeControl, noop, muteToggle, i;
  noop = function() {};
  listeners = [];
  player = {
    id: noop,
    language: noop,
    languages: noop,
    on: function(event, callback){
      // don't fire dispose listeners
      if (event !== 'dispose') {
        listeners.push(callback);
      }
    },
    ready: noop,
    volume: function(){
      return 1;
    },
    muted: function(){
      return false;
    },
    tech: {
      'featuresVolumeControl': true
    },
    reportUserActivity: function(){}
  };

  volumeControl = new vjs.VolumeControl(player);
  muteToggle = new vjs.MuteToggle(player);

  equal(volumeControl.hasClass('vjs-hidden'), false, 'volumeControl is hidden initially');
  equal(muteToggle.hasClass('vjs-hidden'), false, 'muteToggle is hidden initially');

  player.tech['featuresVolumeControl'] = false;
  for (i = 0; i < listeners.length; i++) {
    listeners[i]();
  }

  equal(volumeControl.hasClass('vjs-hidden'), true, 'volumeControl does not hide itself');
  equal(muteToggle.hasClass('vjs-hidden'), true, 'muteToggle does not hide itself');

  player.tech['featuresVolumeControl'] = true;
  for (i = 0; i < listeners.length; i++) {
    listeners[i]();
  }

  equal(volumeControl.hasClass('vjs-hidden'), false, 'volumeControl does not show itself');
  equal(muteToggle.hasClass('vjs-hidden'), false, 'muteToggle does not show itself');
});

test('should test and toggle play control on `loadstart`', function(){
  var player, playToggle, paused;
  player = PlayerTest.makePlayer();
  player.paused = function() {
    return paused;
  };
  paused = true;
  playToggle = new vjs.PlayToggle(player);
  player.trigger('ready');

  ok((/\bvjs-paused\b/).test(playToggle.el().className), 'has class vjs-paused');
  ok(!(/\bvjs-playing\b/).test(playToggle.el().className), 'does not have class vjs-playing');

  paused = false;
  player.trigger('loadstart');
  ok(!(/\bvjs-paused\b/).test(playToggle.el().className), 'does not have class vjs-paused');
  ok((/\bvjs-playing\b/).test(playToggle.el().className), 'has class vjs-playing');
});

test('calculateDistance should use changedTouches, if available', function() {
  var noop, player, slider, event;
  noop = function() {};
  player = {
    id: noop,
    on: noop,
    ready: noop,
    reportUserActivity: noop
  };
  slider = new vjs.Slider(player);
  document.body.appendChild(slider.el_);
  slider.el_.style.position = 'absolute';
  slider.el_.style.width = '200px';
  slider.el_.style.left = '0px';

  event = {
    pageX: 10,
    changedTouches: [{
      pageX: 100
    }]
  };

  equal(slider.calculateDistance(event), 0.5, 'we should have touched exactly in the center, so, the ratio should be half');
});

test('should hide playback rate control if it\'s not supported', function(){
  expect(1);

  var player = PlayerTest.makePlayer();
  var playbackRate = new vjs.PlaybackRateMenuButton(player);

  ok(playbackRate.el().className.indexOf('vjs-hidden') >= 0, 'playbackRate is not hidden');
});
