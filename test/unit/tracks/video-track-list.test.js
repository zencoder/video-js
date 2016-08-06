/* eslint-env qunit */
import VideoTrackList from '../../../src/js/tracks/video-track-list.js';
import VideoTrack from '../../../src/js/tracks/video-track.js';
import EventTarget from '../../../src/js/event-target.js';

QUnit.module('Video Track List');

QUnit.test('trigger "change" when "selectedchange" is fired on a track', function() {
  const track = new EventTarget();

  track.loaded_ = true;
  const videoTrackList = new VideoTrackList([track]);
  let changes = 0;
  const changeHandler = function() {
    changes++;
  };

  videoTrackList.on('change', changeHandler);
  track.trigger('selectedchange');
  QUnit.equal(changes, 1, 'one change events for trigger');

  videoTrackList.off('change', changeHandler);
  videoTrackList.onchange = changeHandler;

  track.trigger('selectedchange');
  QUnit.equal(changes, 2, 'one change events for another trigger');
});

QUnit.test('only one track is ever selected', function() {
  const track = new VideoTrack({selected: true});
  const track2 = new VideoTrack({selected: true});
  const track3 = new VideoTrack({selected: true});
  const track4 = new VideoTrack();
  const list = new VideoTrackList([track, track2]);

  QUnit.equal(track.selected, false, 'track is unselected');
  QUnit.equal(track2.selected, true, 'track2 is selected');

  track.selected = true;
  QUnit.equal(track.selected, true, 'track is selected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');

  list.addTrack_(track3);
  QUnit.equal(track.selected, false, 'track is unselected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');
  QUnit.equal(track3.selected, true, 'track3 is selected');

  track.selected = true;
  QUnit.equal(track.selected, true, 'track is unselected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');
  QUnit.equal(track3.selected, false, 'track3 is unselected');

  list.addTrack_(track4);
  QUnit.equal(track.selected, true, 'track is selected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');
  QUnit.equal(track3.selected, false, 'track3 is unselected');
  QUnit.equal(track4.selected, false, 'track4 is unselected');

});

QUnit.test('all tracks can be unselected', function() {
  const track = new VideoTrack();
  const track2 = new VideoTrack();
  /* eslint-disable no-unused-vars */
  const list = new VideoTrackList([track, track2]);
  /* eslint-enable no-unused-vars */

  QUnit.equal(track.selected, false, 'track is unselected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');

  track.selected = true;
  QUnit.equal(track.selected, true, 'track is selected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');

  track.selected = false;
  QUnit.equal(track.selected, false, 'track is unselected');
  QUnit.equal(track2.selected, false, 'track2 is unselected');
});

QUnit.test('trigger a change event per selected change', function() {
  const track = new VideoTrack({selected: true});
  const track2 = new VideoTrack({selected: true});
  const track3 = new VideoTrack({selected: true});
  const track4 = new VideoTrack();
  const list = new VideoTrackList([track, track2]);
  let change = 0;

  list.on('change', () => change++);
  track.selected = true;
  QUnit.equal(change, 1, 'one change triggered');

  list.addTrack_(track3);
  QUnit.equal(change, 2, 'another change triggered by adding an selected track');

  track.selected = true;
  QUnit.equal(change, 3, 'another change trigger by changing selected');

  track.selected = false;
  QUnit.equal(change, 4, 'another change trigger by changing selected');

  list.addTrack_(track4);
  QUnit.equal(change, 4, 'no change triggered by adding a unselected track');
});
