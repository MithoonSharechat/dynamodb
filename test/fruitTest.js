var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var fruitsDao = require('../daos/fruitsDao');
var app = require('../app');


describe('saveFruit', ()=> {
    before(() =>{
        sinon.stub(fruitsDao, 'getFruit').callsFake(async (fruitId) => {
            return {
                success: true,
                message: "successfully queried data",
                data: [
                    {
                        fruitId: '1',
                        name: "Apple"
                    }
                ]
            };
        });
        sinon.stub(fruitsDao, 'saveFruit').callsFake( async (fruit)=> {
            return {success: true, message: "successfully added data"};
        });

        sinon.stub(fruitsDao, 'deleteFruit').callsFake( async (fruitId)=> {
            return {success: true};
        });
        sinon.stub(fruitsDao, 'getFruits').callsFake( async ()=> {
            return {
                success: true,
                message: "successfully queried data",
                data: [
                    {
                        fruitId: '1',
                        name: "Apple"
                    },
                    {
                        fruitId: '2',
                        name: "Orange"
                    }
                ]
            };
        });
    });

    after(()=> {
        fruitsDao.getFruit.restore();
        fruitsDao.saveFruit.restore();
        fruitsDao.deleteFruit.restore();
        fruitsDao.getFruits.restore();
    });


    it('fetching fruit by fruitId = 1', async ()=>{
        const res = await request(app).get('/getFruit/1')
        .set('Accept', 'application/json');
        expect(res.body.success).to.be.equal(true);
        expect(res.body.data[0].fruitId).to.be.equal('1');
		expect(res.status).to.be.equal(200);
    });

    it('saving a fruit', async ()=> {
        const res = await request(app).post('/saveFruit')
        .set('Accept', 'application/json')
        .send({fruitId: "1", name: "apple"});
        expect(res).to.exist;
        expect(res.status).to.be.equal(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.message).to.be.equal('successfully added data');
    });

    it('deleting a fruit', async ()=> {
        const res = await request(app).delete('/deleteFruit/1')
        .set('Accept', 'application/json');
        expect(res).to.exist;
        expect(res.status).to.be.equal(200);
        expect(res.body.success).to.be.equal(true);
    });

    it('getting all fruits', async ()=> {
        const res = await request(app).get('/getFruits')
        .set('Accept', 'application/json');
        expect(res).to.exist;
        expect(res.status).to.be.equal(200);
        expect(res.body.data[0].fruitId).to.be.equal('1');
        expect(res.body.data[1].fruitId).to.be.equal('2');
    });

});
