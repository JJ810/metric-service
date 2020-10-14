import { Request, Response, Router } from 'express'
import { localStorage } from '../utils/helper'
import { IData } from 'src/utils/types'

const router = Router()

router.post('/:key', (req: Request, res: Response) => {
  const key: string = req.params.key
  const value: number = req.body.value

  const dataAsString: string | null = localStorage.getItem('data')
  let dataArray: IData[] | null = dataAsString ? JSON.parse(dataAsString) : null

  const body: IData = {
    key: key,
    value: value,
    timestamp: new Date().getTime(),
  }

  if (dataArray) {
    dataArray.push(body)
  } else {
    dataArray = [body]
  }

  localStorage.setItem('data', JSON.stringify(dataArray))

  try {
    res.status(200).json({})
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:key/sum', (req: Request, res: Response) => {
  const key: string = req.params.key
  const currentTime = new Date().getTime()

  const dataAsString: string | null = localStorage.getItem('data')
  let dataArray: IData[] | null = dataAsString ? JSON.parse(dataAsString) : null

  let sum = 0

  if (dataArray) {
    let filteredArray = dataArray.filter(
      (data: IData) =>
        data.key === key && currentTime - data.timestamp < 60 * 60 * 1000
    )

    localStorage.setItem('data', JSON.stringify(filteredArray))

    filteredArray.map((data: IData) => {
      sum += data.value
    })
  }

  try {
    res.status(200).json({
      value: sum,
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
