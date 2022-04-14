import { useState } from "react"
import cuid from "cuid"
import { loremIpsum } from "lorem-ipsum"
import axios from 'axios'

interface Pageview {
  id: string
  created_at: Date

  page: {
    title: string
    description: string
    tags: string[]
  }

  user: {
    id: string
    created_at: Date
  }
}

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

export const usePageviewGenerator = () => {
  const [pageview, setPageview] = useState<Pageview | null>(null)

  const generate = async () => {
    const event: Pageview = {
      id: cuid().slice(21),
      created_at: new Date(),

      page: {
        title: loremIpsum(),
        description: loremIpsum({ count: 3 }),
        tags: Array.from({ length: Math.floor(Math.random() * 10) }, () => loremIpsum({ units: 'words', count: 1 })),
      },

      user: {
        id: `USER${cuid().slice(21)}`,
        created_at: randomDate(new Date(2019, 0, 1), new Date()),
      },
    };
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    const saved = await axios.post(`${BASE_URL}/pages/register`, event);


    console.log(saved, 'saved');

    setPageview(event)
    

  }

  return {
    generate,
    pageview
  }
}
