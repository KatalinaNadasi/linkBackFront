import { useState, useEffect } from 'react'
import axios from 'axios'
import { FormControl, InputLabel, Input} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';


import Card from './Card'

function Course() {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [datas, setDatas] = useState({name: '', price: ''})

  // useEffect(() => {
  //   axios.get('http://localhost:4040/courses')
  //   .then(res => {
  //     setCourses(res.data)
  //   })
  //   .catch((err) => setError(err))
  // })
  // console.log(courses)




  useEffect(() => {
    const getCourses = async () => {
      try {
        const courses = await axios.get('http://localhost:4040/courses')
        setCourses(courses.data)
      } catch(err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getCourses()
  }, [])

  if(loading) return <div>loading...</div>

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axios.post(
        'http://localhost:4040/courses',
        {...datas}
      )
      toast.success('Le cours à bien été rajouté !')
      } catch(err) {
        console.log(err);
        toast.error(`${err.message}`)
      } finally {
        setLoading(false)
      }
  }

  const onChangeDatas = (e) => {
    setDatas({
      ...datas,
      [e.target.name] : e.target.value
    })
  }

console.log(datas)
  return (
    <>
    {
      error ? (
        <h1>error</h1>
      ) : (
        courses.length && (
          <>
          <div style={{display: 'flex'}}>
            {
              courses.map((course, index) => (
                <Card
                  key={index}
                  id={course.id}
                  name={course.name}
                  price={course.price}
                  picture={'https://s1.qwant.com/thumbr/0x380/8/8/2d1f58a7c132b25fba29c155aadeb32add1e3c893db2ffe8b7461dc0816b43/beautiful-ginger-kitten-so-cute-5b2b746fa11fa.jpg?u=https%3A%2F%2Fwww.pets4homes.co.uk%2Fimages%2Fclassifieds%2F2018%2F06%2F21%2F1962373%2Flarge%2Fbeautiful-ginger-kitten-so-cute-5b2b746fa11fa.jpg&q=0&b=1&p=0&a=0'}
                  />
              ))
            }
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                name="name"
                onChange={onChangeDatas}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Price</InputLabel>
              <Input
                name="price"
                onChange={onChangeDatas}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          </>
        )
      )
    }
    </>
  )
}

export default Course
