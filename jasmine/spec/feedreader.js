/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('each feed has a url and is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });

        it('each feed has a name and is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });
    });

    describe('Menu', function () {
        it('is hidden by default', function () {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

        it('changes visibility on button click', function () {
           let btn = document.querySelector('.menu-icon-link');
            var e = document.createEvent('HTMLEvents');
            e.initEvent('click', false, true);
            btn.dispatchEvent(e);

            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);

            btn.dispatchEvent(e);

            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

       it('has at least one entry on the DOM', function (done) {
           let container = document.querySelector('.feed');
           expect(container.childElementCount).toBeGreaterThan(0);
           done();
       });
    });
    
    describe('New Feed Selection', function () {
        let oldFeed, newFeed;

        beforeEach(function (done) {
            loadFeed(0, () => {
                oldFeed = document.querySelector('.header-title').innerHTML;
                loadFeed(1, () => {
                    newFeed = document.querySelector('.header-title').innerHTML;

                    done();
                })
            });
        });

        it('expect to change content when new feed is loaded', function () {
            expect(oldFeed).not.toEqual(newFeed);
        });
    });
}());
