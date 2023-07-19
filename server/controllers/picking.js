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
        const data = await PickingSchema.find();
        
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
    const data = await Expenses.find();

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
    const { startDate, endDate } = req.body || {};

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

        res.status(200).json( data );
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
  const month = now.getMonth() +1;
  const year = now.getFullYear();
  const  monthlyStartDate = new Date(` 0${ month }-01-${ year } 00:00:00 GMT`);
  const annualStartDate = new Date(now - 365*24*60*60*1000);
  const pickYr = `${now.getFullYear()-1} - ${now.getFullYear()}`


  // console.log(startDate, now);
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
      }}},{
        $group: { "_id": pickYr, 'annualExpenses': { '$sum': '$amount' }}
      }
    ])

    res.status(200).json({ data, lastOneYear, monthlyExpenses, annualExpenses});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error});
  }

}

export const lastOneYear = async(req, res) => {
  const now = new Date();

  try {
    const data = await PickingSchema.aggregate([
      {
        $match: { "createdAt": {
          '$gte': startDate,
          '$lte': now
        }}
      },{
        $group: { "_id": pickYr, 'lastOneYear': { '$sum': "$weight"}}
      }

    ])

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error});
  }
  
}

export const getMonthlyExpense = async(req, res) => {
  const now = new Date();
  const month = `${now.getMonth() + 1}`;
  const startDate = new Date(`01 ${month} ${ now.getFullYear()} 00:00:00`);

  try {
    const data = await Expenses.aggregate([
      { $match : {"createdAt": {
          '$gte': startDate,
          '$lte': now
      }}},
      { $group: {
        "_id": month, 'monthlyExpenses': { '$sum': '$amount'}
      }}
    ])
  
    res.status(200).json(data);    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error});
  }
}

export const getAnnualExpenses = async(req, res) => {
  const now = new Date();
  const startDate = new Date(now - (365 * 24 * 60 * 60 * 1000));
  const oneYr = `${startDate.getFullYear()} - ${now.getFullYear()}`;

  

  res.status(200).json(data);
}