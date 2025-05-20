-- 1. Write a query to find all the blog posts whose created date is greater/equal to given date.

Select bd_blog_title from blog_details where bd_date_added >= CURRENT_DATE;

-- 2. Write a query to find all the blog posts whose create date is less than given date.

Select bd_blog_title from blog_details where bd_date_added < CURRENT_DATE;

-- 3. Write a query to find all the blog posts whose created date between given start date & end date. 

select bd_blog_title from from blogs_details where bd_date_modified BETWEEN '2023-01-01 AND 2024-01-01';

-- 4. Write a query to list all the comments on a particular blog.

select bc_comment from blogs_comment where bc_blog_id = ""; 

-- select bc_comment from blogs_comments as bc INNER JOIN blogs_details as bd ON bd.bd_blog_id = bc.bc_blog_id WHERE bd.blog_title = '';

-- 5. Write a query to transfer all the posts of a particular user to another user.

UPDATE blogs_details WHERE bd_user_id =   SET bd_user_id =   ;

-- 6. Write a query to get total published blogs 

select COUNT(*) AS blocks_published from blogs_details where bd_status = 'published';

-- 7. Write a query to update blog title of "8 SEO strategies to keep on radar in 2017" to "8 SEO strategies to keep on radar in 2018".

UPDATE blogs_details SET blog_title = "8 SEO strategies to keep on radar in 2018" where blog_title = "8 SEO strategies to keep on radar in 2017";

-- 8. Write a query to get all active users 

select bu_first_name, bu_last_name from blogs_users where bu_status = "active";

-- 9. Write a query to get all active categories 

select bc_category_name from blogs_categories where bc_status = "active";

-- 10. Write a query to find all the blog posts for a particular user (i.e. based on username)

select bd.bd_blog_title, bu.bu_first_name from blogs_details as bd JOIN blogs_users as bu ON bu.bu_user_id = bd.bd_user_id WHERE bu.bu_first_name = "Abc";

-- 11. Write a query to find the user details for a particular post

select bd.bd_user_id, bu.bu_first_name, bu.bu_last_name, bu.bu_email from blogs_detaisl as bd JOIN blogs_users as ON bd.bd_user_id = bu.bu_user_id WHERE bd.bd_title = "This is a blog";

-- 12. Write a query to delete all the posts of a particular user 

DELETE FROM blogs_details WHERE bd_user_id = "";

-- 13. Write a query to find blog post & their corresponding comment count.

select bd.bd_blog_title, COUNT(bc.bc_comment_id) AS Comment_count FROM blogs_comment as bc JOIN blogs_details as bd ON bd.bd_blog_id = bc.bc_blog_id GROUP BY bd.bd_blog_id ORDER BY Comment_count DESC;

-- 14. Write two query to get all published blogs modified by inactive users.



-- 15. Write a query to get most modifed blogs according to all users


-- 16. Write a query to get draft blogs by inactive users 

select bd.bd_body_title FROM blogs_details as bd JOINS blogs_users as bu ON bd.bd_user_id = bu.bu_user_id WHERE (bu.bu_status = 'Inactive' AND bd.bd_blog_status = 'Draft'); 

-- 17. Write a query to find the blog post having the maximum comment count.

select bd.bd_blog_title, COUNT(bc.bc_comment_id) AS Comment_count FROM blogs_comment as bc JOIN blogs_details as bd ON bd.bd_blog_id = bc.bc_blog_id GROUP BY bd.bd_blog_id ORDER BY Comment_count DESC; LIMIT1 

-- 18. Write a query to get all active categories and their no of blogs

select bc.bc_category_name, COUNT(bd.bd_blog_id) FROM blogs_categories AS bc JOIN blogs_details AS bd ON bd.bd_category_id = bc.bc_category_id WHERE bc.bc_category_status = 'Active' GROUP BY bc.bc_category_name 

-- 19. Write a query to find out all the blog post of particular given sub category (Sub category name is given)



-- 20. Write a query to find out all the blog post of particular given main category (category name is given)

select bd.bd_blog_title, bc.bc_category_name from blogs_details AS bd JOIN blogs_categories AS bc ON bd.bd_category_id = bc.bc_category_id WHERE bc.bc_category_name = "Horror"