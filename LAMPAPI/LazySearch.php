<?php
        // Group 18 Fall 2022
        // The goal of this code is to search for any contact where the what is searched for
        // is in the first or last name.

        $inData = getRequestInfo();

        // Creates an array for the search result to be placed into.
        $searchResults = array();
        $lazyResults = array();
        $searchCount = 0;

        // Makes the connection to mySQL.
        $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331G18");

        // Fail safe in case the connection is not made to mySQL.
        if ($conn->connect_error)
        {
                returnWithError( $conn->connect_error );
        }
        // If passed it will continue with searching the database for user input in the
        // first and last name.
        else
        {
                // Formats the command to search for contacts.
                $stmt = $conn->prepare("select * from Contacts where Name like ? and UserID=?");
                $name = "%" . $inData["name"] . "%";
                $stmt->bind_param("sd", $name, $inData["userId"]);

                // Executes the statement with mySQL.
                $stmt->execute();

                $result = $stmt->get_result();

                // Saves search results to the array.
                while($row = $result->fetch_assoc())
                {
                        $searchResults[$searchCount] = $row;
                        $searchCount++;
                }


                // If the array is empty it will return "no records found".
                if( $searchCount == 0 )
                {
                        returnWithError( "No Records Found" );
                }
                // If the array was filled it will diplay the search results.
                else
                {
                        for ($x = 0; $x < 10; $x++) {
                            $lazyResults[$x] = $searchResults[$x + ($inData["pageNum"] * 10)];
                        }
                        returnWithInfo( json_encode($lazyResults) );
                }

                // Deallocates the statment handle.
                $stmt->close();

                // Closes the connection with mySQL.
                $conn->close();
        }

        // The following functions were from the Professors code.
        function getRequestInfo()
        {
                return json_decode(file_get_contents('php://input'), true);
        }
        function sendResultInfoAsJson( $obj )
        {
                header('Content-type: application/json');
                echo $obj;
        }
        function returnWithError( $err )
        {
                $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
                sendResultInfoAsJson( $retValue );
        }
        function returnWithInfo( $searchResults )
        {
                sendResultInfoAsJson( $searchResults );
        }
?>
