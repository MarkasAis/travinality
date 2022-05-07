require 'rails_helper'

RSpec.describe "locations#index", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/locations", params: params
  end

  describe 'basic fetch' do
    let!(:location1) { create(:location) }
    let!(:location2) { create(:location) }

    it 'works' do
      expect(LocationResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(['locations'])
      expect(d.map(&:id)).to match_array([location1.id, location2.id])
    end
  end
end
