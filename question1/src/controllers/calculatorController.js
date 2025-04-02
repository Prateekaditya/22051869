exports.calculateAverage = (req, res) => {
    try {
      const { numbers } = req.body;
  
      if (!numbers) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide an array of numbers'
        });
      }
  
      if (!Array.isArray(numbers)) {
        return res.status(400).json({
          status: 'error',
          message: 'Input must be an array of numbers'
        });
      }
  
      if (numbers.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Array cannot be empty'
        });
      }
  
      for (const num of numbers) {
        if (typeof num !== 'number') {
          return res.status(400).json({
            status: 'error',
            message: 'All elements in the array must be numbers'
          });
        }
      }
      let sum = 0;
      for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      const average = sum / numbers.length;
      return res.status(200).json({
        status: 'success',
        data: {
          numbers: numbers,
          count: numbers.length,
          sum: sum,
          average: average
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  };
  