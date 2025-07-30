import IdGeneratorModel from '../../../models/IdGeneratorModel';

export async function createId(idCode: string) {
  if (!idCode) {
    throw new Error('Invalid id code.');
  }

  const result = await IdGeneratorModel.findOneAndUpdate(
    { code: idCode },
    {
      $inc: { seq: 1 },
    },
    { new: true, upsert: true }
  );

  const seq = zeroPad(result.seq, 5);

  return idCode + seq;
}

function zeroPad(num: number, places: number) {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
}
