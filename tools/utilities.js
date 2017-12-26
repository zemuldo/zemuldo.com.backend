'use strict'
let schemas = require('../db/schemas/index')

module.exports ={
    validatePost: (post)=> {
        let validator = schemas.post
        return new Promise(function (resolve,reject) {
            if(post){
                let state = {error:'invalid data'}
                Object.keys(validator).forEach(function(prop) {
                    if(!post[prop]){
                      reject  ({error: "No "+prop+" defined in post"})
                    }
                    else {
                        if(validator[prop].type!==typeof post[prop]){
                            reject( {error:'Expecting '+validator[prop].type+" on field "+prop+' but got '+ typeof post[prop]})
                        }
                        else {
                            state = true
                        }
                    }
                })
                resolve(state)
            }
            else {
                reject({error:'invalid data '})
            }
        })
            .then(function (success) {
                if(success){
                    if(!(post.title.length>validator.title.minLen && post.title.length<validator.title.maxLen)){
                        return {error:"title must be between "+validator.title.minLen+" and "+validator.title.maxLen +' characters'}
                    }
                    if(!(validator.type[post.type])){
                        return {error:"No category "+post.type}
                    }
                    if(post.author!=="Danstan Onyango"){
                        return {error:"User  "+post.author+" doesn't exist"}
                    }
                    return true
                }
            })
            .catch(function (err) {
                return err
            })
    },
    toSentanceCase:lower=>{
        let arr =  lower.split(' ')
        let o = []
        arr.forEach(function (elem) {
           if(elem){
               let letters = elem.split('')
               letters[0]= letters[0]
               elem = letters.join('')
               o.push(elem)
           }
           else {
               console.log("----------------------------")
           }
        })
        return o.join(' ')
    },
    normalizeQuery:query=>{
        Object.keys(query).forEach(function(prop) {
            if(typeof query[prop]==='string'){
                query[prop]=query[prop].toLocaleLowerCase()
            }
        })

        return query
    },
    shuffle:(array) =>{
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}