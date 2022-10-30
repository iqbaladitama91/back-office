export default {
    commaAmount(value : any, withoutCommaSeparator = false){
        let a = value.toString();
        if (a.indexOf('.') === -1) {
          a += '.00';
        }
        let b = a.split('.')[0];
        let c = a.split('.')[1];
    
        b = b === '' ? '0' : b.replace(/[,.]/g, '').toString();
        if (!withoutCommaSeparator) {
          b = b.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
    
        if (c === undefined) {
          c = '00';
        } else if (c.length === 1) {
          c += '0';
        } else if (c.length === 2) {
          c = c.slice(0, 2);
        } else {
          const x = c.slice(2, 3);
          const y = c.slice(1, 2);
          const s = c.slice(0, 1);
          if (x >= 5) {
            const z = parseInt(y, 10) + 1;
            c = s + z;
          } else {
            c = c.slice(0, 2);
          }
        }
    
        console.log(`${b}.${c}`);
        return `${b}.${c}`;
        
      }
}
