describe('high level layout', () => {
            it('should contain a bootstrap container', () => {
                expect($('body>div.container').length).toEqual(1);
            });

            it('should contain a bootstrap row', () => {
                should.equal($('body>div.container>div.row').length, 1);
            })

            it('should contain a left column (col-sm-4 col-xs-12)', () => {
                should.equal($('body>div.container>div.row>div.col-xs-12.col-sm-4').length, 1);
            });

            it('should contain a right column (col-sm-8 col-xs-12)', () => {
                should.equal($('body>div.container>div.row>div.col-xs-12.col-sm-8').length, 1);
            })
        });