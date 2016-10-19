import com.nrg.trailers.firebase.service.FirebaseRoot
import com.nrg.trailers.firebase.service.FirebaseService
import com.nrg.trailers.domain.Market
import spock.lang.Specification

/**
 * Created by rene on 19/10/16.
 */
class FirebaseServiceSpec extends Specification{

    def 'should return a not null value'(){
        given:
        def path = '/markets/abcd-1234'
        FirebaseService service = new FirebaseService()
        FirebaseRoot root = new FirebaseRoot()
        root.init()
        service.root = root

        when:
        Market marketFound = service.getAs(path, Market);

        then:
        marketFound!=null
        println(marketFound.name)
        true
    }
}
