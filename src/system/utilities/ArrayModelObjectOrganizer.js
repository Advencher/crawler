class ArrayModelObjectOrganizer {

    constructor(array) {
    }

    ticketModelDestructor(array) {
          //const rowArray = Array.from(array);
          return array.slice(1).map((array) => {
            const [
              check,
              identifier,
              sendDate,
              updateDate,
              category,
              trueName,
              topic,
              status,
              owner,
              lastAnswerer,
              timeSpend,
              shop,
              phone,
              priority,
            ] = array.map((row) => row);

            return {
              check,
              identifier,
              sendDate,
              updateDate,
              category,
              trueName,
              topic,
              status,
              owner,
              lastAnswerer,
              timeSpend,
              shop,
              phone,
              priority,
            };
          });
    }
}

export default new ArrayModelObjectOrganizer();