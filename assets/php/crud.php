<?php
	include 'config.php';
	$response = array();

	// Function to execute a database function
	function execute_query($query) 
	{
		global $response;
	    $result = mysql_query($query);
	
	    if (!$result) 
	    {
	        $response['error']['failure'] = "Could not execute query ".$query.". ".mysql_error();
	    }
	    return $result;
	}

	// Auto connect to the database
	$connection = @mysql_connect($db_host, $db_user, $db_password);
	if (!$connection) 
	{
		$response['error']['failure'] = "Could not connect to database server. ".mysql_error();
	} 
	else 
	{
		$database = @mysql_select_db($db_database);
		
		if (!$database) 
		{
			$response['error']['failure'] = "Could not open database. ".mysql_error();
		} 
	}

	// If connected to database, provide barebones web services
	if (!isset($response['error'])) 
	{
		if ($_SERVER['REQUEST_METHOD'] == "GET") // Retrieve stories
		{
			// Check if we are getting stories no later than an ID
			if (isset($_GET['id'])) {
				$result = execute_query("SELECT * FROM story WHERE id < ".mysql_real_escape_string($_GET['id'])." ORDER BY date DESC LIMIT 10");
			}
			else {
				$result = execute_query("SELECT * FROM story ORDER BY date DESC LIMIT 10");
			}
			
			if ($result)
			{
				while($row = mysql_fetch_array($result))
				{
					$response['success'][] = array(
						'id' => $row['id'],
						'name' => $row['name'],
						'date' => date("g:i a, F jS", strtotime($row['date'])),
						'story' => preg_replace("/(\n)+/","</p><p>", $row['story'])
					);
				}
			}
			
		}
		else if ($_SERVER['REQUEST_METHOD'] == "POST") // Create new story
		{
			// Data validation
			$fields = array('name', 'email', 'story');
			foreach ($fields as $field) 
			{
				if (!isset($_POST[$field]) || strlen($_POST[$field]) < 1)
				{
					$response['error'][$field] = 'The '.$field.' field is required.';
				}
				else if ($field == "email" && !filter_var($_POST[$field], FILTER_VALIDATE_EMAIL))
				{
					$response['error'][$field] = 'A valid email address is required.';
				}
			}
		
			// No errors in the data, do post
			if (!isset($response['error']))
			{
				
				if (execute_query("INSERT INTO story (name, email, story, ip, date) VALUES ('".mysql_real_escape_string(strip_tags($_POST['name']))."','".mysql_real_escape_string($_POST['email'])."','".mysql_real_escape_string(strip_tags($_POST['story']))."','".$_SERVER['REMOTE_ADDR']."',now())")) 
				{
					$result = execute_query("SELECT * FROM story WHERE id = ".mysql_insert_id());
					$row = @mysql_fetch_array($result);
					$response['success']['id'] = $row['id'];
					$response['success']['name'] = $row['name'];
					$response['success']['date'] = date("g:i a, F jS", strtotime($row['date']));
					$response['success']['story'] = preg_replace("/(\n)+/","</p><p>", $row['story']);
				}
			}
	
		}
		else if ($_SERVER['REQUEST_METHOD'] == "DELETE")
		{
			
			
		}
	}

	// Send response
	echo json_encode($response);
?>