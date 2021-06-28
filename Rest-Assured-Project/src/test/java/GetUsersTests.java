import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import org.testng.annotations.Test;
import io.restassured.response.Response;

public class GetUsersTests {
	
	private static String baseUrl = "https://jsonplaceholder.typicode.com/users";
	
	@Test
	void testStatusCodeOk() {
		given()
			.get(baseUrl)
		.then()
			.statusCode(200);
	}
	
	@Test
	void testTenRecordsReturned() {
		given()
			.get(baseUrl)
		.then()
			.body("size", is(10));
	}
	
	@Test
	void testRetrievingSingleUser() {
		Response wholeListResponse = get(baseUrl);
		String userId = wholeListResponse.jsonPath().getString("id[0]");
		
		given()
			.get(baseUrl + "?id=" + userId)
		.then()
			.assertThat()
				.body("size", is(1))
				.body("id[0].toString()", equalTo(userId));
			
	}
	
	@Test
	void testDennisSchulistExistsInList() {
		given()
			.get(baseUrl)
		.then()
			.body("name", hasItem("Mrs. Dennis Schulist"));
	}
	
}
