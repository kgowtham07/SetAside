    document.addEventListener("click", (e) => {
  
      
      /**
       * Insert the page-hiding CSS into the active tab,
       * then get the beast URL and
       * send a "beastify" message to the content script in the active tab.
       */
      function getTabs(tabs) {
        console.log(tabs);
        var obj = JSON.parse(tabs.master_workset);
        console.log(obj);
        var ws = obj.workset;
        var i = 0;
        for (i in ws) {
          console.log(ws[i].s_tab);
          var j = 0;
          for (j in (ws[i].s_tab)){
            console.log(ws[i].s_tab[j]);
              var creating = browser.tabs.create({url:`${ws[i].s_tab[j]}`});
              creating.then(setItem, reportError);
          }
        
      } 

        browser.storage.local.clear();
      }

      function setAside(tabs){

        browser.storage.local.get("master_workset",function(master_workset_db){

          console.log(`Master Workset ${master_workset_db}`)
          
          try{

            var master_workset_obj = JSON.parse(master_workset_db.master_workset);
            
            var dt = new Date();
            var timeStamp = dt.toUTCString();

            var present_workset = {name : `${timeStamp}` , s_tab : []};
            present_workset = JSON.stringify(present_workset);

            var i = 0;
            var obj = JSON.parse(present_workset);
          
            var creating = browser.tabs.create({});
            creating.then(setItem, reportError);
          
            for (let tab of tabs){
              obj['s_tab'].push(tab.url);
              console.log(tab.id)
          
              var removing = browser.tabs.remove(tab.id);
              removing.then(setItem, reportError);
          
            }

            present_workset = JSON.stringify(obj);
            console.log(`Message2 going to be saved: ${present_workset}`);

            master_workset_obj['workset'].push(obj);
            var master_workset = JSON.stringify(master_workset_obj);

            console.log(`Message2 saved: ${master_workset}`);
            browser.storage.local.set({master_workset})
              .then(setItem, reportError);
          }
          catch(error){
            var master_workset = {workset : []}
            master_workset = JSON.stringify(master_workset);
            master_workset_obj = JSON.parse(master_workset);
            console.log(master_workset);
            // master_workset = JSON.stringify(master_workset);
            // master_workset_obj = JSON.parse(master_workset);
            // console.log(master_workset_obj);

            var dt = new Date();
            var timeStamp = dt.toUTCString();

            var present_workset = {name : `${timeStamp}` , s_tab : []};
            present_workset = JSON.stringify(present_workset);

            var i = 0;
            var obj = JSON.parse(present_workset);
          
            var creating = browser.tabs.create({});
            creating.then(setItem, reportError);
          
            for (let tab of tabs){
              obj['s_tab'].push(tab.url);
              console.log(tab.id)
          
              var removing = browser.tabs.remove(tab.id);
              removing.then(setItem, reportError);
          
            }

            var parsed_present_ws = obj;
            present_workset = JSON.stringify(obj);
            console.log(`Message going to be saved: ${parsed_present_ws}`);

          // master_workset_obj['workset'].push(present_workset);
            master_workset_obj['workset'].push(parsed_present_ws);
            master_workset = JSON.stringify(master_workset_obj);

            console.log(`Message saved: ${master_workset}`);
            browser.storage.local.set({master_workset})
              .then(setItem, reportError);
          }
      });

      }
      

      function setItem() {
        console.log("OK");
      }

      function reportError(error) {
        console.error(`Could not statisfy: ${error}`);
      }
  
      
      if (e.target.classList.contains("getTabs")) {
        browser.storage.local.get("master_workset")
          .then(getTabs)
          .catch(reportError);
      }
      if (e.target.classList.contains("setAside")) {
        browser.tabs.query({currentWindow: true})
          .then(setAside)
          .catch(reportError);
      }
    });