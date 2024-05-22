import { Hono } from 'hono'
import {createBlogInput, updateBlogInput} from '@jappreet/blogs-common'
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import {verify} from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

blogRouter.use('/*', async(c, next) => {
  const authHeader = c.req.header("authorization")||"";
  const token = authHeader.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if(user) {
        c.set("userId", user.id);
        await next();
    } else{
        c.status(403);
        return c.json({
          message: "Not logged in: Unauthorized"
      })
    }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "Not logged in"
    })
  }
});



blogRouter.post('/', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      message: "Input not right"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })
  return c.json({
    id: blog.id
  })
})

blogRouter.put('/',async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Inputs not correct"
      })
  }
  
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})

blogRouter.get('/bulk', async (c)=> {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const url = new URL(c.req.url);
  const skip = parseInt(url.searchParams.get('skip') || '0', 10);
  const take = parseInt(url.searchParams.get('take') || '10', 10);
  const blogs = await prisma.post.findMany({
    skip: skip,
    take: take,
    select: {
      content: true,
      title: true,
      id: true,
      author: {
          select: {
              name: true
          }
      }
  }
  });
  return c.json({
    blogs
  })
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	try {
    const post = await prisma.post.findUnique({
      where: {
        id
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
            select: {
                name: true
            }
        }
      }
    });
  
    return c.json({
      post
    });

  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog request"
    })
  }
	
})

