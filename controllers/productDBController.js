const fs = require('fs');
const path = require('path');
const keyword_extractor = require('keyword-extractor');
const Product = require("../models/productModel");
const Seller = require('../models/sellerModel');

const addProduct = (req, res) => {
    const file = path.join(__dirname,'../',req.file.destination,'/', req.file.filename);
    const tagString = req.body.name.concat(' ').concat(req.body.description).concat(' ').concat(req.body.tags);
    const tags = keyword_extractor.extract(tagString, {
        language: "english",
        remove_digits: false,
        return_changed_case: true,
        remove_duplicates: true
    });
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        seller: req.user.uuid,
        city: req.user.city,
        quantity: req.body.quantity,
        image: {
            mimetype: req.file.mimetype,
            data: fs.readFileSync(file)
        },
        tags: tags
    };

    Product.create(newProduct, (err, product) => {
        if(!err) {
            fs.unlink(file, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log('temporary file successfully deleted');
                }
            });
            res.redirect('/seller');
        } else {
            console.log(err);
            res.render('err', {error: "error in adding product. try after some time or contact dev team."});
        }
    })
}

const findProductsForSeller = (req, res) => {
    Product.find({seller: req.user.uuid}, (err, found) => {
        if(!err && found) {
            res.render('sellerExplore', {products: found});
        } else {
            res.render('err', {error: "error loading seller products on homepage"});
        }
    });
}

const findProductsForCity = (req, res) => {
    Product.find({city: req.user.city}, (err, found) => {
        if(!err && found) {
            res.render('consumerExplore',{products:found, city: req.user.city});
        } else {
            res.render('err', {error: "error loading products on consumer homepage"});
        }
    })
}

const findProductById = (req,res) => {
    Product.findById(req.params.id, (err, found) => {
        if(!err && found) {
            res.render('sellerProductDetails',{element: found});
        } else {
            res.render('err', {error: 'error in loading product'});
        }
    });
}

const findProductByIdForConsumer = (req, res) => {
    Product.findById(req.params.id, (err, found) => {
        if(!err && found) {
            Seller.findOne({uuid: found.seller}, (err, seller) => {
                if(!err && seller) {
                    res.render('consumerProductDetails',{element: found, seller: seller});
                } else {
                    res.render('err', {error: 'error in loading product'});
                }
            })
            
        } else {
            res.render('err', {error: 'error in loading product'});
        }
    });
}

const editProduct = (req, res) => {
    const tagString = req.body.name.concat(' ').concat(req.body.description).concat(' ').concat(req.body.tags);
    const tags = keyword_extractor.extract(tagString, {
        language: "english",
        remove_digits: false,
        return_changed_case: true,
        remove_duplicates: true
    });
    const edit = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        tags: tags
    };
    Product.findByIdAndUpdate(req.body.id, edit ,(err, docs) => {
        if(!err) {
            res.redirect('/seller');
        } else {
            console.log(err);
            res.render('err', {error: "error in editing product. try after some time or contact dev team."});
        }
    });
}

const editProductImage = (req, res) => {
    const file = path.join(__dirname,'../',req.file.destination,'/', req.file.filename);
    const edit = {
        image: {
            mimetype: req.file.mimetype,
            data: fs.readFileSync(file)
        }
    };
    Product.findByIdAndUpdate(req.body.id, edit ,(err, docs) => {
        if(!err) {
            res.redirect('/seller');
        } else {
            console.log(err);
            res.render('err', {error: "error in editing product image. try after some time or contact dev team."});
        }
    });
}

const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.body.id,(err, docs) => {
        if(!err) {
            res.redirect('/seller');
        } else {
            console.log(err);
            res.render('err', {error: "error in editing product image. try after some time or contact dev team."});
        }
    });
}
const keywords = (string) => {
    let tags = [];
    const tagString = string;
         tags = keyword_extractor.extract(tagString, {
            language: "english",
            remove_digits: false,
            return_changed_case: true,
            remove_duplicates: true
        });
    return tags;
}

const searchProducts = (req, res) => {
    Product.find({city: req.user.city}, (err, found) => {
        const sorted = [];
        const tagString = req.body.input;
        const tags = keywords(tagString);
        // console.log(tags);
        found.forEach(element => {
            let checker = 0;
            let sort = {};
            tags.forEach(element1 => {
                if(element.tags.includes(element1)) {
                    checker=checker+1;
                }
            });
            if(checker > 0) {
                sort = {
                    product: element,
                    tags: checker
                }
                sorted.push(sort);
            }
            
        });
        const sortAccToTags = sorted.sort((a, b) => parseFloat(b.tags) - parseFloat(a.tags));
        // console.log(sortAccToTags);
        const final = [];
        sortAccToTags.forEach(element => {
            final.push(element.product);
        });
        res.render('consumerExplore',{products:final, city: req.user.city});
        
    })
}

module.exports = {
    findProductsForSeller, findProductsForCity, findProductById, findProductByIdForConsumer, editProduct, editProductImage, deleteProduct, addProduct, searchProducts
}