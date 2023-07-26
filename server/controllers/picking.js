import PickingSchema from "../models/picking.js";
import mongoose from "mongoose";
import Expenses from "../models/expenses.js";

export const getOnePick = async(req, res) => {
    const { id: _id } = req.params;

    try {
        const data = await PickingSchema.findById(_id);
        res.status(201).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPicked = async(req, res) => {

    try {
        const data = await PickingSchema.find().sort({_id: -1});
        
        res.status(200).send(data);
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const createPicked = async(req, res) => {
    const { weight } = req.body;

    try {
        const newPick = new PickingSchema({ weight });
        await newPick.save();
    
        res.status(200).json(newPick);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const updatePick = async( req, res ) => {
    const { id: _id } = req.params;
    const pick = req.body;

    // console.log(_id, weight);
    try {
         if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json(`The id is invalid`);
         
         const updatedPick =  await PickingSchema.findByIdAndUpdate(_id, { ...pick, _id}, { new: true });

         res.status(200).json(updatedPick);
                
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deletePick = async(req,res) => {
    const { id: _id } = req.params;

    // console.log(_id)

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ "message": "The id is invalid"});

        await PickingSchema.findByIdAndDelete(_id);
        
        res.status(200).json({ "massage": "deleted successfully"});
    } catch (error) {
        // console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getOneExpense = async(req, res) => {
  const { id: _id } = req.params;

  try {
    const data = await Expenses.findById(_id);

    // console.log(data)
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const getExpenses = async(req, res) => {
  // console.log('here')
  try {
    const data = await Expenses.find().sort({ _id: -1 });

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const createExpense = async(req, res) => {
  const { expenseType, amount, narration, status } = req.body;

  try {
    const expenseData =  new Expenses({ expenseType, amount, narration, status });

    await expenseData.save();

    res.status(200).json(expenseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `A server error occurred` })
  }
}

export const updateExpense = async(req, res) => {
  const { id: _id } = req.params;
  const data = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: `Not a valid MongoDb ID` });

  try {

    const updatedExpense = await Expenses.findByIdAndUpdate(_id, { ...data, _id }, { new: true });

    res.status(200).send(updatedExpense);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });    
  }
}

export const deleteExpense = async(req, res) => {
  // console.log('here')
  const { id: _id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Not a valid MongoDB ID' });

  try {
    await Expenses.findByIdAndDelete(_id);

    res.status(200).json({ message: 'Expense deleted successfully' });     
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const monthlyTotals = async(req, res) => {
    const { startDate, endDate } = req.body;
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear()
    const annualStartDate = (now.getMonth() < 6 ) ? new Date(` 07-01-${ year - 1 } 00:00:00 GMT`) : new Date(` 07-01-${ year } 00:00:00 GMT`);

    try {
      const data = await PickingSchema.aggregate(
          [
              {
                '$match': {
                  'createdAt': {
                    '$gte': new Date(startDate), 
                    '$lte': new Date(endDate)
                  }
                }
              }, {
                '$group': {
                  '_id': {
                    '$cond': [
                      {
                        'lt': ''
                      },
                       `${ startDate } - ${ endDate }`, '0'
                    ]
                  }, 
                  'total': {
                    '$sum': '$weight'
                  }
                }
              }
            ]
      );

        const eachMonthTotals = await PickingSchema.aggregate([
          {
            $match: { 'createdAt': {
              '$gte': new Date(startDate),
              '$lte': new Date(endDate)
            }}
          },
          {
            $group: {
              _id: { 
                 $month: '$createdAt' ,
              },
              weight: { $sum: '$weight'},
            }
          },{
            
            $sort: { _id: 1}
          }
        ]);

        // console.log(startDate, endDate);
      // console.log(eachMonthTotal);

        res.status(200).json( eachMonthTotals );
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const groupByMonth = async(req, res) => {
  // const { startDate, endDate } = req.body;
  const now = new Date();
  // const oneYr = new Date(now - (365*24*60*60*1000))
  // const endDate = new Date(`Wed, 30 June 2023 23:59:46 GMT`);
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const  monthlyStartDate = new Date(` 0${ month }-01-${ year } 00:00:00 GMT`);
  const annualStartDate = (now.getMonth() < 6 ) ? new Date(` 07-01-${ year - 1 } 00:00:00 GMT`) : new Date(` 07-01-${ year } 00:00:00 GMT`);
  const pickYr = `${now.getFullYear()-1} - ${now.getFullYear()}`


  try {
    const data = await PickingSchema.aggregate([
      { $match: { "createdAt": {
        '$gte': monthlyStartDate,
        '$lte': now
        }}
      },
      { $group: { "_id": month, 'monthlyPicks' : { '$sum': '$weight'}}}
    ])

    const lastOneYear = await PickingSchema.aggregate([
      {
        $match: { "createdAt": {
          '$gte': annualStartDate,
          '$lte': now
        }}
      },{
        $group: { "_id": pickYr, 'lastOneYear': { '$sum': "$weight"}}
      }

    ])

    const eachMonthTotal = await PickingSchema.aggregate([
      {
        $match: { 'createdAt': {
          '$gte': monthlyStartDate,
          '$lte': now
        }}
      },
      {
        $group: {
          _id: { 
             $month: '$createdAt' ,
          },
          weight: { $sum: '$weight'},
        }
      },{
        
        $sort: { _id: 1}
      }
    ]);

    const monthlyExpenses = await Expenses.aggregate([
      { $match : {"createdAt": {
          '$gte': monthlyStartDate,
          '$lte': now
      }}},
      { $group: {
        "_id": '', 'monthlyExpenses': { '$sum': '$amount'}
      }}
    ])

    const annualExpenses = await Expenses.aggregate([
      { $match: { 'createdAt': {
        '$gte': annualStartDate,
        '$lte': now
      }}},
      // {
      //   $project: {    
      //     month: { $month: '$createdAt' },
      //     year: { $year: '$createdAt' },
      //     amount: 1
      //   }
      // },
      {
        $group: { _id: 
        {
          month: { $month: '$createdAt' },
          // year: { $year: '$createdAt' }
        }, 'annualExpenses': { '$sum': '$amount' }
      }
      }
    ]);

    const eachMonthExpenses = await Expenses.aggregate([
      {
        $match: { 'createdAt': {
          '$gte': annualStartDate,
          '$lte': now
        }}
      },
      {
        $group: {
          _id: { 
            $month: '$createdAt' 
            // year: { $year: '$createdAt' },
          },
          amount: { $sum: '$amount' },
        }
      }
    ])

    const eachYearPicks = await PickingSchema.aggregate([
      {
        $match: { 'createdAt': {
          '$gte': new Date(annualStartDate - (365 * 24 * 60 * 60 * 1000)),
          '$lte': now
        }}
      },
      {
        $group: {
          _id: {
            $year: '$createdAt'
          },
          weight: { $sum: '$weight' }
        }
      }
    ]);

    const eachYearExpenses = await Expenses.aggregate([
      {
        $match: { 'createdAt': {
          '$gte': new Date(annualStartDate - ( 365 * 24 * 60 * 60 * 1000)),
          '$lte': now
        }}
      }, {
        $group: {
          _id: {
            $year: '$createdAt'
          },
          amount: { $sum: '$amount' }
        }
      }
    ])

    // console.log(eachYearExpenses);
    // console.log({'annualStartDate': (now.getMonth() < 6 ) })
    res.status(200).json({ 
      data, lastOneYear, monthlyExpenses,
      annualExpenses, eachMonthExpenses, 
      eachMonthTotal, eachYearPicks, eachYearExpenses
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error});
  }

}
