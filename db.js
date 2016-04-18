module.exports = {
  getAllRestaurants: function(pg, res, cb) {
    var results = [];
    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas....");

      client
        .query("SELECT * FROM restaurant;")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  },

  checkAndAddRestaurant: function(req, pg, res, cb) {
    var results = [];
    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj",
      function(err, client, done) {
        if(err) {done(); console.log(err);}
        console.log("Connected to DB,  getting schemas...");

        client
          .query("SELECT * FROM restaurant WHERE location = '" + request.location + "';")
          .on('row', function(row) {
            results.push(row);
          })
          .on('end', function() {
            //done();
            if(results.length == 0) {
              addRestaurant(req, pg, res, cb);
            } else {
              done();
               var result = {
                'status': 'ERROR',
                'message': 'Restaurant AlreadY Exists',
                'contents': {}
               };
              cb(result, res);
            }
          });
      });
  },

  addRestaurant: function(req, pg, res, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result, res);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.body;
        //console.log(request);
        client
          .query("INSERT INTO restaurant VALUES ('" + request.name + "', '" + request.location + "', " + request.qualityrating + ", " + request.pricerating + ", '" + request.foodstyle + "' );")
          .on('end', function() {
            done();
            result['status'] = 'SUCCESS';
            result['message'] = 'Restaurant ' + request.name + ' successfully added.';
            result['contents'] = request;
            cb(result, res);
          });
      }
    });
  },

  //need to test
  getRestaurantByLocation: function(req, pg, res, cb) {
    var results = [];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");
      
      var loc = req.params.location.replace(/\+/g, " ");
      console.log(req.params.location);

      client
        .query("SELECT * FROM restaurant WHERE location='"+req.params.location+"';")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results[0], res);
        });
    });
  },

  deleteRestaurantByLocation: function(req, pg, res, cb) {
    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      var loc = req.params.location.replace(/\+/g, " ");

      var results = {"message": "Restaurant at "+loc+" NOT deleted"};

      client
        .query("DELETE FROM review WHERE (location='"+loc+"');")
        .on('end', function() {
          client
            .query("DELETE FROM restaurant WHERE (location='"+loc+"');")
            .on('end', function() {
              done();
              results['message'] = "Review for restaurant at "+loc+" SUCCESSFULLY deleted";
              cb(results, res);
            });
          });
      
    });
  },


  getAllCustomers: function(pg, res, cb) {
    var results = [];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas....");

      client
        .query("SELECT * FROM customer;")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  },

  addCustomer: function(req, pg, res, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    // SHA1 hash function by user x4u for free use from programmers.stackexchange.com
    var msg = req.body.password;
    function rotl(n,s) { return n<<s|n>>>32-s; };
    function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };
    var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff; 
    var i, t, W=new Array(80), ml=msg.length, wa=new Array();
    msg += String.fromCharCode(0x80);
    while(msg.length%4) msg+=String.fromCharCode(0);
    for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
    while(wa.length%16!=14) wa.push(0);
    wa.push(ml>>>29),wa.push((ml<<3)&M);
    for( var bo=0;bo<wa.length;bo+=16 ) {
      for(i=0;i<16;i++) W[i]=wa[bo+i];
      for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
      var A=H0, B=H1, C=H2, D=H3, E=H4;
      for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
    }
    var hashedpassword = tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);


    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result, res);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.body;

        var queryString = "INSERT INTO customer VALUES ('" + request.fullname + "', '" + request.username + "', '" + hashedpassword + "', " + request.zipcode + ", ";
        var foodStyles = request['favoritefoodstyles[]'];
        var insertArrayStr = "";
        if(foodStyles.length > 0) {
          insertArrayStr = "'{";
          for(var i = 0; i < foodStyles.length-1; i++) {
            insertArrayStr += '"'+foodStyles[i]+'", ';
          }
          insertArrayStr += '"'+foodStyles[foodStyles.length-1]+'"}\''
        } else {
          insertArrayStr = "'{}'"
        }

        queryString += insertArrayStr + ');';

        console.log(queryString);

        client
          .query(queryString)
          .on('end', function() {
            done();
            result['status'] = 'SUCCESS';
            result['message'] = 'Customer account for ' + request.fullname + ' (' + request.username + ') successfully added.';
            result['contents'] = request;
            cb(result, res);
          });
      }
    });
  },

  checkValidLogin: function(req, pg, res, cb) {
    var results = [];

    // SHA1 hash function by user x4u for free use from programmers.stackexchange.com
    var msg = req.params.password;
    function rotl(n,s) { return n<<s|n>>>32-s; };
    function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };
    var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff; 
    var i, t, W=new Array(80), ml=msg.length, wa=new Array();
    msg += String.fromCharCode(0x80);
    while(msg.length%4) msg+=String.fromCharCode(0);
    for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
    while(wa.length%16!=14) wa.push(0);
    wa.push(ml>>>29),wa.push((ml<<3)&M);
    for( var bo=0;bo<wa.length;bo+=16 ) {
      for(i=0;i<16;i++) W[i]=wa[bo+i];
      for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
      var A=H0, B=H1, C=H2, D=H3, E=H4;
      for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
      H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
    }
    var hashedpassword = tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM customer WHERE (username='"+req.params.username+"' AND hashedpassword = '" + hashedpassword + "');")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          var result = {
             'status': 'Cool Beans!',
             'message': 'accepted',
             'contents': {}
             };
          if(results.length  == 0) {
            result["status"] = "Not Cool Beans";
            result["message"] = "rejected";
          }

          cb(result, res);

        });
    });
  },

  getCustomerByUN: function(req, pg, res, cb) {
    var results = [];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM customer WHERE username='"+req.params.username+"';")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results[0], res);
        });
    });
  },

  getReviewByUN: function(req, pg, res, cb) {
    var results = [];
    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM review WHERE username='"+req.params.username+"';")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results[0], res);
        });
    });
  },

  getReviewByLocationAndUN: function(req, pg, res, cb) {
    var results = [];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      var loc = req.params.location.replace(/\+/g, " ");

      client
        .query("SELECT * FROM review WHERE (username='"+req.params.username+"' AND location = '" + loc + "');")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  },

  getReviewByLocation: function(req, pg, res, cb) {
    var results = [];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      var loc = req.params.location.replace(/\+/g, " ");

      client
        .query("SELECT * FROM review WHERE location='"+loc+"';")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  },

  addReview: function(req, pg, res, cb) {
    var result = {
      'status': 'ERROR',
      'message': 'Error connecting',
      'contents': {}
    };

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {
        done();
        result['contents'] = {'errorMSG': err};
        cb(result, res);
      }
      else {
        console.log("Connected to DB, getting schemas...");
        var request = req.body;

        // Insert new review
        client
          .query("INSERT INTO review VALUES (now(), " + request.qualityrating + ", '" + 
            request.comment + "', " + request.pricerating + ", '" + request.username+ "', '" + request.location + "', '" +
            request.restaurantname + "');")
          .on('end', function() {
            result['status'] = 'SUCCESS';
            result['message'] = 'Review for ' + request.restaurantname + ', by ' + request.username + ', successfully added.';
            result['contents'] = request;

            var newAvgPriceRating = 0;
            var newAvgQualityRating = 0;
            var rows = [];

            var loc = req.body.location.replace(/\+/g, " ");

            // Update the restaurant's average qualityrating and pricerating
            client
              .query("SELECT * FROM review WHERE location='"+loc+"';")
              .on('row', function(row) {
                rows.push(row);
              })
              .on('end', function() {
                var totPriceRating = 0.0;
                var totQualityRating = 0.0;
                for(var i = 0; i < rows.length; i++) {
                  totPriceRating += rows[i]['pricerating'];
                  totQualityRating += rows[i]['qualityrating'];
                }

                newAvgPriceRating = Math.round(totPriceRating/rows.length);
                newAvgQualityRating = Math.round(totQualityRating/rows.length);

                var updateQuery = "UPDATE restaurant SET (qualityrating, pricerating) = ("+newAvgQualityRating+", "+
                  newAvgPriceRating+") WHERE location='"+loc+"';";

                client
                .query(updateQuery)
                .on('end', function() {
                  done();
                  cb(result, res);
                });
              });
          });
      }
    });
  },

  getAllReviews: function(pg, res, cb) {
    var results = [];

    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      client
        .query("SELECT * FROM review;")
        .on('row', function(row) {
          results.push(row);
        })
        .on('end', function() {
          done();
          cb(results, res);
        });
    });
  },

  deleteReviewByUNandLocation: function(req, pg, res, cb) {
    pg.connect("postgres://vgokgwmllyuvta:Y8jxNsM8vZOTSxd-fMBfvlqrF2@ec2-54-235-152-114.compute-1.amazonaws.com:5432/d51ijnnak3emfj", 
      function(err, client, done) {
      if(err) {done(); console.log(err);}
      console.log("Connected to DB, getting schemas...");

      var un = req.params.username;
      var loc = req.params.location.replace(/\+/g, " ");

      var results = {"message": "Review for restaurant at "+loc+" by "+un+" NOT deleted"};

      client
        .query("DELETE FROM review WHERE (username='"+un+"' AND location='"+loc+"');")
        .on('end', function() {
          results['message'] = "Review for restaurant at "+loc+" by "+un+" SUCCESSFULLY deleted";

          var newAvgPriceRating = 0;
          var newAvgQualityRating = 0;
          var rows = [];

          // Update the restaurant's average qualityrating and pricerating
          client
            .query("SELECT * FROM review WHERE location='"+loc+"';")
            .on('row', function(row) {
              rows.push(row);
            })
            .on('end', function() {
              var totPriceRating = 0.0;
              var totQualityRating = 0.0;
              for(var i = 0; i < rows.length; i++) {
                totPriceRating += rows[i]['pricerating'];
                totQualityRating += rows[i]['qualityrating'];
              }

              newAvgPriceRating = Math.round(totPriceRating/rows.length);
              newAvgQualityRating = Math.round(totQualityRating/rows.length);

              var updateQuery = "UPDATE restaurant SET (qualityrating, pricerating) = ("+newAvgQualityRating+", "+
                newAvgPriceRating+") WHERE location='"+loc+"';";

              client
              .query(updateQuery)
              .on('end', function() {
                done();
                cb(results, res);
              });
            });
          });
    });
  }
};